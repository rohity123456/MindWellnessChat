import { Router } from "express";
import messagesController from "@/controllers/message";
const messagesRouter = Router();

messagesRouter.get("/:roomId", messagesController.getMessages);
export default messagesRouter;
