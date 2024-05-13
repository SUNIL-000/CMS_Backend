import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import { userRoutes } from "./src/routes/User.js";
import { DBconnect } from "./src/util/dbcoonect.js";
import { firRoutes } from "./src/routes/fir.js";
import { missingPerson } from "./src/routes/missing.js";


export const app = express();

config({
  path: ".env",
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
  
    extended: true
  })
);
// app.use(express.json({ limit: "100mb" }));
app.use(morgan("dev"));
app.use(cors());
DBconnect();

//////////////////user apis//////////
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/fir", firRoutes);
app.use("/api/v1/missing", missingPerson);


app.listen(process.env.PORT, () => {
  console.log(`server listen at ${process.env.PORT}`);
});
