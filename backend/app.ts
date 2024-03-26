import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "@/routes/auth";

dotenv.config();
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);

// Auth
app.use("/auth", authRouter);
// Auth

// Routes

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Backend app listening on PORT ${PORT}`);
  console.log("Connecting to MongoDB...");
  const mongoDB = process.env.DB_URI || "";
  mongoose
    .connect(mongoDB)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((error) => {
      console.log("Error connecting to DB: ", error);
    });
});

export default app;
