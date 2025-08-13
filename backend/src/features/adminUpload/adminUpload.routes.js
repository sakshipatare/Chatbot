import express from "express";
import multer from "multer";
import fs from "fs";
import * as mammoth from "mammoth";
import { AdminUploadController } from "./adminUpload.controller.js";
import { authMiddleware } from "../../middleware/authenticate.js";

const router = express.Router();
const controller = new AdminUploadController();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Upload DOCX and extract text
router.post("/upload", authMiddleware, upload.array("files", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    let uploadedFiles = [];

    for (let file of req.files) {
      const docBuffer = fs.readFileSync(file.path);
      const { value: extractedText } = await mammoth.extractRawText({ buffer: docBuffer });

      const fileData = await controller.uploadFileWithText({
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
        textContent: extractedText,
        uploadedBy: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
        },
      });

      uploadedFiles.push(fileData);
    }

    res.json({
      message: `${uploadedFiles.length} DOCX file(s) uploaded and processed successfully`,
      uploadedFiles
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing DOCX files" });
  }
});

router.get("/uploads", authMiddleware, controller.getUploads);
router.get("/search", authMiddleware, controller.searchUploads);

export default router;
