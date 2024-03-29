import { Router } from "express";
import messagesController from "@/controllers/message";
const messagesRouter = Router();

messagesRouter.get("/:roomId", messagesController.getMessages);
messagesRouter.post("/", messagesController.createMessage);
export default messagesRouter;
