import ChatbotService from "./chatbot.service.js";

class ChatbotController {
  // Existing method for all docs
  static async processQuestionFromAllDocs(req, res) {
    try {
      const { question } = req.body;
      if (!question) {
        return res.status(400).json({ error: "No question provided" });
      }

      const text = await ChatbotService.extractTextFromAllDocs();
      const answer = await ChatbotService.answerQuestion(text, question);

      return res.json({
        message: "Question processed successfully",
        answer
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to process question" });
    }
  }

  // New method for existing single doc
  static async processExistingDoc(req, res) {
    try {
      const { filename, question } = req.body;
      if (!filename) {
        return res.status(400).json({ error: "No filename provided" });
      }

      const text = await ChatbotService.extractTextFromExistingDoc(filename);

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
