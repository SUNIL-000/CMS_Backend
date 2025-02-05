import express from "express"
import { createMissingPerson, deleteSingleMissingPersons, getAllMissingPersons, getSingleMissingPersons, updateMissingPerson } from "../controller/missing.js";
import {  upload } from "../Middleware/multer.js";

export const missingPerson=express.Router();



missingPerson.post("/new",upload.single("photo_url"), createMissingPerson)
missingPerson.get("/all",getAllMissingPersons)
missingPerson.get("/single/:id",getSingleMissingPersons)
missingPerson.put("/:id",updateMissingPerson)
missingPerson.delete("/:id",deleteSingleMissingPersons)






