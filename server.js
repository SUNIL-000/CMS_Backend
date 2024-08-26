import express from "express";
import morgan from "morgan";
import cors from "cors";
import { userRoutes } from "./src/routes/User.js";
import { DBconnect } from "./src/util/dbcoonect.js";
import { firRoutes } from "./src/routes/fir.js";
import { missingPerson } from "./src/routes/missing.js";
import { config } from "./src/config/config.js";
import dotenv from 'dotenv';
export const app = express();


dotenv.config({
  path: ".env"
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.json({ limit: "100mb" }));
app.use(morgan("dev"));
app.use(cors());
DBconnect();

//////////////////user apis//////////
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/fir", firRoutes);
app.use("/api/v1/missing", missingPerson);


app.listen(config.port || 5000, () => {
  console.log(`server listen at ${config.port}`);
});
