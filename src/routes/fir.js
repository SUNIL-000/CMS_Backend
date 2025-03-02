import express from "express"
import { allFir, deleteFir, editFir, newFir, searchRecord, singleRecord } from "../controller/fir.js";

export const firRoutes=express.Router();



firRoutes.post("/new",newFir)

firRoutes.delete("/:id",deleteFir)
firRoutes.get("/all",allFir)
firRoutes.put("/:id",editFir)
firRoutes.get("/:id",singleRecord)
firRoutes.get("/search/fir",searchRecord)


