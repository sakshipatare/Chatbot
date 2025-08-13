import mongoose from "mongoose";

const url = "mongodb://localhost:27017/chatbot_db";

export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,      // For parsing the connection string
      useUnifiedTopology: true,  // For using new Server Discovery engine
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.log("❌ Error connecting to MongoDB");
    console.log(err);
  }
};
