import express, { Request, Response, NextFunction } from "express";
import authRouter from "@/routes/auth";
import userRouter from "@/routes/user";
import roomRouter from "@/routes/room";
import messagesRouter from "@/routes/message";
import { isAuthenticated } from "@/middlewares/auth";

const apiRouter = express.Router();

/* GET home page. */
apiRouter.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("Server is running");
});

// Auth
apiRouter.use("/auth", authRouter);

// User
apiRouter.use("/users", isAuthenticated, userRouter);

// Room
apiRouter.use("/rooms", isAuthenticated, roomRouter);

// Message
apiRouter.use("/messages", isAuthenticated, messagesRouter);

export default apiRouter;
