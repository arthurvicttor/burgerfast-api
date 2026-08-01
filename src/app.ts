import express from "express";
import cors from "cors";
import path from "path";
import { errorMiddleware } from "./middlewares/error.middleware";
import { router } from "./routes";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
  }),
);

app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/api", router);
app.use(errorMiddleware);

export { app };
