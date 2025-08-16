# 🤖 **Chatbot**

![GitHub repo size](https://img.shields.io/github/repo-size/sakshipatare/Chatbot?color=blue&style=for-the-badge)  
![GitHub contributors](https://img.shields.io/github/contributors/sakshipatare/Chatbot?color=green&style=for-the-badge)  
![GitHub stars](https://img.shields.io/github/stars/sakshipatare/Chatbot?color=yellow&style=for-the-badge)  
![GitHub forks](https://img.shields.io/github/forks/sakshipatare/Chatbot?style=for-the-badge)  

---

## 📖 Overview  
This project is a **full-stack web application** that integrates **authentication, document management, and an AI-powered chatbot**.  
It ensures **secure user access**, easy **document handling**, and an **interactive chatbot** that can extract text, answer questions, and even display images if documents contain image URLs.  

---

## 🚀 Features  

### 🔐 Authentication  
✔️ User **Sign Up / Register**  
✔️ **Login / Sign In**  
✔️ **Sign Out**  
✔️ **Email Verification** with secure token  

### 📂 Document Management  
✔️ Upload `.pdf`, `.docx`, etc.  
✔️ **Search** uploaded files  
✔️ **Delete** files securely  

### 🤖 Chatbot (Powered by Google Generative AI – Gemini)  
✔️ Answers **user queries** with AI  
✔️ Extracts **text from uploaded documents**  
✔️ Displays **images from URLs** inside chat  

---

## 🛠️ Tech Stack  

| Category     | Tools / Libraries |
|--------------|------------------|
| **Frontend** | React.js, Tailwind CSS |
| **Backend**  | Node.js, Express.js |
| **Database** | MongoDB |
| **Auth**     | JWT, Bcrypt.js, Nodemailer |
| **File Handling** | Multer |
| **AI** | Google Generative AI (Gemini API) |

---
## ⚙️ Core Functionalities  

1️⃣ **Authentication Flow**  
- Register → Email verification link sent  
- Verify email → Account activated  
- Login → JWT token generated  
- Logout → Session destroyed  

2️⃣ **Document Management**  
- Upload → Stored in `uploads/`  
- Search → Query files by name/metadata  
- Delete → Remove file + DB record  

3️⃣ **Chatbot Workflow**  
- User asks → Bot checks documents  
- AI generates response using Gemini API  
- If **image URL found**, bot displays image inline  

---
## 📦 Installation & Setup  
2️⃣ Backend setup
cd backend
npm install
npm start

3️⃣ Frontend setup
cd frontend
npm install
npm start

4️⃣ Environment Variables

Create .env in backend/

MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
GOOGLE_API_KEY=your_generative_ai_key

## 🧑‍💻 Tools Used

⚛️ React.js

🎨 Tailwind CSS

🟢 Node.js & Express.js

🍃 MongoDB

🔐 JWT & Bcrypt.js

📧 Nodemailer

📂 Multer

🤖 Google Generative AI (Gemini)

🎯 Future Enhancements

👥 Role-based access (Admin, User)

⚡ Real-time chat with WebSockets

📝 Support more file formats

📊 Analytics for uploaded documents

## ✨ Built with ❤️ by Sakshi Patare

