import dotenv from "dotenv"
dotenv.config()


export const config = {
  db: {
    connectionURI: process.env.MONGO_URL,
  },
  port: process.env.PORT,
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
};
