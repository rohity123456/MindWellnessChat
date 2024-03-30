import { Router } from "express";
import userController from "@/controllers/user";
const userRouter = Router();

userRouter.get("/list", userController.getUsers);
userRouter.get("/mychats", userController.getUserChats);
export default userRouter;
