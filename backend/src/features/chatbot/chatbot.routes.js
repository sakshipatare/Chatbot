import express from "express";
import ChatbotController from "./chatbot.controller.js";

const router = express.Router();

// Process existing DOCX file from uploads
router.post("/process-doc", ChatbotController.processExistingDoc);

export default router;
