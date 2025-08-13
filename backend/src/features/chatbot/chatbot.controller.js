import ChatbotService from "./chatbot.service.js";

class ChatbotController {
  // Use existing file
  static async processExistingDoc(req, res) {
    try {
      const { filename, question } = req.body;
      if (!filename) {
        return res.status(400).json({ error: "No filename provided" });
      }

      const text = await ChatbotService.extractTextFromExistingDoc(filename);

      // If a question is provided, get an answer
      let answer = null;
      if (question) {
        answer = await ChatbotService.answerQuestion(text, question);
      }

      return res.json({
        message: "Document processed successfully",
        content: text,
        answer: answer || null,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to process document" });
    }
  }
}

export default ChatbotController;
