import { AdminUploadModel } from "./adminUpload.schema.js";

export default class AdminUploadRepo {
  async uploadDocument({ fileName, filePath, adminId }) {
    try {
      const newUpload = new AdminUploadModel({
        fileName,
        filePath,
        uploadedBy: adminId,
      });

      await newUpload.save();
      return { message: "File uploaded successfully", status: 201 };
    } catch (error) {
      console.error("Error uploading file:", error);
      return { message: "Error uploading file", status: 500 };
    }
  }

  async getAllUploadsByAdmin(adminId) {
    try {
      const uploads = await AdminUploadModel.find({ uploadedBy: adminId });
      return uploads;
    } catch (error) {
      console.error("Error fetching uploads:", error);
      return [];
    }
  }
}
