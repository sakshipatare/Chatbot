// server.js
import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import { connectUsingMongoose } from './src/config/db.js';

const PORT = process.env.PORT || 4000;

connectUsingMongoose();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
