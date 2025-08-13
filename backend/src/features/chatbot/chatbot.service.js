// import fs from "fs";
// import path from "path";
// import mammoth from "mammoth";

// const uploadsDir = path.join(process.cwd(), "uploads");

// class ChatbotService {
//   static async extractTextFromExistingDoc(filename) {
//     try {
//       const filePath = path.join(uploadsDir, filename);

//       if (!fs.existsSync(filePath)) {
//         throw new Error("File not found in uploads folder");
//       }

//       const { value: text } = await mammoth.extractRawText({ path: filePath });
//       return text.trim();
//     } catch (err) {
//       throw new Error("Error reading .docx file: " + err.message);
//     }
//   }

//   static async answerQuestion(text, question) {
//     try {
//       // Lazy-load OpenAI so it uses the API key after dotenv is loaded
//       const OpenAI = (await import("openai")).default;
//       const openai = new OpenAI({
//         apiKey: process.env.OPENAI_API_KEY
//       });

//       const prompt = `
// You are a helpful assistant. 
// Answer the question using only the information from the following document: 

// Document:
// ${text}

// Question:
// ${question}
//       `;

//       const completion = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [{ role: "user", content: prompt }],
//       });

//       return completion.choices[0].message.content.trim();
//     } catch (err) {
//       console.error("AI answer error:", err.message);
//       return "Sorry, I couldn't find an answer.";
//     }
//   }
// }

// export default ChatbotService;


import fs from "fs";
import path from "path";
import mammoth from "mammoth";

const uploadsDir = path.join(process.cwd(), "uploads");

class ChatbotService {
  static async extractTextFromExistingDoc(filename) {
    try {
      const filePath = path.join(uploadsDir, filename);

      if (!fs.existsSync(filePath)) {
        throw new Error("File not found in uploads folder");
      }

      const { value: text } = await mammoth.extractRawText({ path: filePath });
      return text.trim();
    } catch (err) {
      throw new Error("Error reading .docx file: " + err.message);
    }
  }

  static async answerQuestion(text, question) {
//     const mockResponses = [
//       `Based on the provided document, the answer to your question "${question}" could be inferred as follows: ...`,
//       `After analyzing the document, here's what I think: ...`,
//       `From the text in the document, the relevant detail for "${question}" seems to be ...`,
//       `The document mentions some information related to "${question}", here’s a summary: ...`,
//       `Looking through the document, it appears that the answer might be ...`
//     ];

//     try {
//       // Lazy-load OpenAI so it uses the API key after dotenv is loaded
//       const OpenAI = (await import("openai")).default;
//       const openai = new OpenAI({
//         apiKey: process.env.OPENAI_API_KEY
//       });

//       const prompt = `
// You are a helpful assistant. 
// Answer the question using only the information from the following document: 

// Document:
// ${text}

// Question:
// ${question}
//       `;

//       const completion = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [{ role: "user", content: prompt }],
//       });

//       return completion.choices[0].message.content.trim();
//     } catch (err) {
//       console.error("AI answer error:", err.message);
//       // Return a random mock response for testing
//       return mockResponses[Math.floor(Math.random() * mockResponses.length)];

try {
      // Import Gemini API
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
You are a helpful assistant.
Answer the question using only the information from the following document:

Document:
${text}

Question:
${question}
      `;

      const result = await model.generateContent(prompt);
      return result.response.text().trim();

    } catch (err) {
      console.error("AI answer error:", err.message);
      return "Sorry, I couldn't find an answer.";
    }
  }
}

export default ChatbotService;
