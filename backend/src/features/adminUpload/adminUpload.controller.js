import { AdminUploadModel } from "./adminUpload.schema.js";
import fs from "fs";
import { Document, Packer } from "docx";
import * as mammoth from "mammoth"; // best for extracting DOCX text

export class AdminUploadController {
  async uploadFile(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Extract text from DOCX
      const docBuffer = fs.readFileSync(req.file.path);
      const { value: extractedText } = await mammoth.extractRawText({ buffer: docBuffer });

      // Save to DB
      const newFile = await AdminUploadModel.create({
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileText: extractedText || "",
        uploadedBy: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
        },
      });

      res.status(201).json({
        message: "File uploaded and text extracted successfully",
        file: newFile,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Error uploading file",
        error: err.message,
      });
    }
  }

  async getUploads(req, res) {
    try {
      const files = await AdminUploadModel.find({ "uploadedBy.id": req.user._id });
      if (!files.length) {
        return res.status(404).json({ message: "No uploads found" });
      }
      res.json(files);
    } catch (err) {
      res.status(500).json({ message: "Error fetching uploads" });
    }
  }

  async searchUploads(req, res) {
    try {
      const query = req.query.q;
      if (!query) {
        return res.status(400).json({ message: "No search query provided" });
      }

      const results = await AdminUploadModel.find({
        $or: [
          { fileName: { $regex: query, $options: "i" } },
          { fileText: { $regex: query, $options: "i" } },
        ],
      });

      res.json(results);
    } catch (err) {
      res.status(500).json({ message: "Error searching files" });
    }
  }

  async uploadFileWithText(fileObj) {
    return await AdminUploadModel.create({
      fileName: fileObj.originalname,
      filePath: fileObj.path,
      fileText: fileObj.textContent || "",
      uploadedBy: fileObj.uploadedBy,
    });
  }

  async deleteUpload(req, res) {
  try {
    const { fileName } = req.params;
    if (!fileName) {
      return res.status(400).json({ message: "File name is required" });
    }

    // Find the file in DB
    const file = await AdminUploadModel.findOne({ fileName });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Delete the physical file from uploads folder
    if (fs.existsSync(file.filePath)) {
      fs.unlinkSync(file.filePath);
    }

    // Delete from DB
    await AdminUploadModel.deleteOne({ fileName });

    res.json({ message: "File deleted successfully" });
  } catch (err) {
    console.error("Error deleting file:", err);
    res.status(500).json({ message: "Error deleting file", error: err.message });
  }
}

}
