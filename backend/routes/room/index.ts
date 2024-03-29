import { Router } from "express";
import roomController from "@/controllers/room";
const roomRouter = Router();

roomRouter.post("/", roomController.getOrCreateRoom);
roomRouter.get("/:roomId", roomController.getRoom);
export default roomRouter;
