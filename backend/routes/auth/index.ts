import { Router } from "express";
import userController from "@/controllers/user";
const authRouter = Router();

authRouter.post("/signin", userController.signin);
export default authRouter;
