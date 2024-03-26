import express, { Request, Response, NextFunction } from "express";
import authRouter from "@/routes/auth";
import userRouter from "@/routes/user";
import { isAuthenticated } from "@/middlewares/auth";

const apiRouter = express.Router();

/* GET home page. */
apiRouter.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("Server is running");
});

// Auth
apiRouter.use("/auth", authRouter);

// User
apiRouter.use("/user", isAuthenticated, userRouter);

export default apiRouter;
