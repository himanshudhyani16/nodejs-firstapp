import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errormiddleware } from "./middlewares/error.js";
import cors from "cors";

export const server = express();

config({
  path: "./data/config.env",
});
// useing midddleware
server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// using routes
server.use("/api/v1/users", userRouter);
server.use("/api/v1/task", taskRouter);
// using error middleware
server.use(errormiddleware);

// server.get("/", (req, resp) => {
//   resp.send("nice working");
// });
