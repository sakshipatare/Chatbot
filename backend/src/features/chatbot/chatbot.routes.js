import express from "express";
import ChatbotController from "./chatbot.controller.js";

const router = express.Router();

// Ask from a specific existing doc
router.post("/ask", ChatbotController.processExistingDoc);

// Ask from all docs (no filename required)
router.post("/ask-all", ChatbotController.processQuestionFromAllDocs);

export default router;
