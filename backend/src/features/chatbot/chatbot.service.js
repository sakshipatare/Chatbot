// import fs from "fs";
// import path from "path";
// import mammoth from "mammoth";

// const uploadsDir = path.join(process.cwd(), "uploads");

// class ChatbotService {
//   // Get text from all documents in uploads folder
//   static async extractTextFromAllDocs() {
//     try {
//       const files = fs.readdirSync(uploadsDir).filter(f => f.endsWith(".docx"));
//       if (files.length === 0) {
//         throw new Error("No .docx files found in uploads folder");
//       }

//       let allText = "";
//       for (const file of files) {
//         const filePath = path.join(uploadsDir, file);
//         const { value: text } = await mammoth.extractRawText({ path: filePath });
//         allText += `\n\n[Document: ${file}]\n${text.trim()}`;
//       }
//       return allText.trim();
//     } catch (err) {
//       throw new Error("Error reading documents: " + err.message);
//     }
//   }

//   static async answerQuestion(text, question) {
//     const { GoogleGenerativeAI } = await import("@google/generative-ai");
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = `
// You are a helpful assistant.
// Answer the question using only the information from the following documents:

// ${text}

// Question:
// ${question}
//     `;

//     async function tryRequest(attempt = 1) {
//       try {
//         const result = await model.generateContent(prompt);
//         return result.response.text().trim();
//       } catch (err) {
//         // Check for 503 error
//         if (err.message.includes("503") && attempt < 3) {
//           const delay = attempt * 2000; // exponential backoff: 2s, 4s, ...
//           console.warn(`Gemini API overloaded. Retrying in ${delay / 1000}s...`);
//           await new Promise(res => setTimeout(res, delay));
//           return tryRequest(attempt + 1);
//         }
//         console.error("AI answer error:", err.message);
//         return "AI service is temporarily unavailable. Please try again later.";
//       }
//     }

//     return tryRequest();
//   }
// }

// export default ChatbotService;


import fs from "fs";
import path from "path";
import mammoth from "mammoth";

const uploadsDir = path.join(process.cwd(), "uploads");

class ChatbotService {
  // Extract text + URLs (preserve hyperlinks) from all .docx documents
  static async extractTextFromAllDocs() {
    try {
      const files = fs.readdirSync(uploadsDir).filter(f => f.endsWith(".docx"));
      if (files.length === 0) {
        throw new Error("No .docx files found in uploads folder");
      }

      let allText = "";
      for (const file of files) {
        const filePath = path.join(uploadsDir, file);

        // Convert docx to HTML instead of plain text to preserve links
        const { value: html } = await mammoth.convertToHtml({ path: filePath });

        // Replace <a href="..."> with just the URL itself so Gemini can use it
        const cleanText = html
          .replace(/<a[^>]*href="([^"]+)"[^>]*>.*?<\/a>/gi, "$1")
          .replace(/<\/?[^>]+(>|$)/g, ""); // remove other html tags

        allText += `\n\n[Document: ${file}]\n${cleanText.trim()}`;
      }

      return allText.trim();
    } catch (err) {
      throw new Error("Error reading documents: " + err.message);
    }
  }

  static async answerQuestion(text, question) {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a helpful assistant.
Answer the question using only the information from the following documents.
If an image URL is given, include it in your answer clearly.

${text}

Question:
${question}
    `;

    async function tryRequest(attempt = 1) {
      try {
        const result = await model.generateContent(prompt);
        return result.response.text().trim();
      } catch (err) {
        if (err.message.includes("503") && attempt < 3) {
          const delay = attempt * 2000;
          console.warn(`Gemini API overloaded. Retrying in ${delay / 1000}s...`);
          await new Promise(res => setTimeout(res, delay));
          return tryRequest(attempt + 1);
        }
        console.error("AI answer error:", err.message);
        return "AI service is temporarily unavailable. Please try again later.";
      }
    }

    return tryRequest();
  }
}

export default ChatbotService;
