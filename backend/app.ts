import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import { initializeSocketIO } from "socket";
import apiRouter from "@/routes/index";
import cors from "cors";

dotenv.config();
const app = express();

const server = http.createServer(app);
initializeSocketIO(server);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/v1", apiRouter);
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
