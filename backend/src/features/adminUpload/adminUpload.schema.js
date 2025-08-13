import mongoose from "mongoose";

export const adminUploadSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  fileText: { type: String },
  uploadedBy: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // optional, helps in populate()
    },
    name: String,
    email: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export const AdminUploadModel = mongoose.model("AdminUpload", adminUploadSchema);
