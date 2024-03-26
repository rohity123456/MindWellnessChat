import { Router } from "express";
import userController from "@/controllers/user";
const userRouter = Router();

userRouter.get("/list", userController.getUsers);
export default userRouter;
