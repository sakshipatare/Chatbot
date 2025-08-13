import fs from "fs";
import path from "path";
import pdf from "pdf-parse";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "uploads");

async function parseAllPDFs() {
    const files = fs.readdirSync(uploadsDir).filter(f => f.toLowerCase().endsWith(".pdf"));

    for (const file of files) {
        const filePath = path.join(uploadsDir, file);
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        console.log(`✅ ${file}:\n`, data.text);
    }
}

parseAllPDFs();
