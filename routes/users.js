import { Router } from "express";
import userController from "../controller/users.js";
export const router = Router()
 router.get("/",userController.getUsers);
 router.get("/:id",userController.getUserById);
 router.post("/register",userController.registerUser);
 router.post("/login",userController.loginUser);