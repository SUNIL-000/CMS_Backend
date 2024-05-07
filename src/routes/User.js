import express from "express"
import { Login, SignupController, allUser, deleteUSer, makeAdmin } from "../controller/user.js";

export const userRoutes=express.Router();



userRoutes.post("/signup",SignupController)
userRoutes.post("/login",Login)
userRoutes.get("/all",allUser)
userRoutes.put("/:id",makeAdmin)
userRoutes.delete("/:id",deleteUSer)



