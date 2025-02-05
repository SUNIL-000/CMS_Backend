import mongoose from "mongoose";
import { config } from "../config/config.js";

export const DBconnect = async () => {
  try {
    const conn = await mongoose.connect(config.db.connectionURI);

    console.log(`✅ Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database Connection Error:", error);
    process.exit(1);  // Stop server if DB fails
  }
};
