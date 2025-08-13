import express from 'express';
import cors from 'cors';
// import dotenv from 'dotenv';

import userRouter from './features/user/user.routes.js';
// import adminRouter from './features/admin/admin.routes.js';
import adminUploadRouter from './features/adminUpload/adminUpload.routes.js';
import chatbotRouter from './features/chatbot/chatbot.routes.js';

// dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRouter);
// app.use('/admin', adminRouter);
app.use('/admin', adminUploadRouter);
app.use('/chatbot', chatbotRouter);

// Routes (placeholder)
app.get('/', (req, res) => {
  res.send('Welcome to ChatBot Backend!');
});

export default app;
