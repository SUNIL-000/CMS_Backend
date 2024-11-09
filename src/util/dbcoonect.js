import mongoose from "mongoose";
import { config } from "../config/config.js";

export const DBconnect = async () => {
  try {
    const conn = await mongoose.connect(config.db.connectionURI)

    console.log(`db connected: ${conn?.connection?.host}`);
  } catch (error) {
    console.log("Error while connecting to the database");
    console.error(error);
  }
};
