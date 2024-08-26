import dotenv from "dotenv"
dotenv.config()
export const config = {
    db: {
      connectionURI: process.env.MONGO_URL,
    },
    port:process.env.PORT
  };
  