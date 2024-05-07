import express from "express"
import { createMissingPerson, getAllMissingPersons } from "../controller/missing.js";
import { SingleUpload } from "../Middleware/multer.js";

export const missingPerson=express.Router();



missingPerson.post("/new",SingleUpload,createMissingPerson)
missingPerson.get("/all",getAllMissingPersons)



