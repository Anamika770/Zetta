import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authMiddleware from "./middlewares/authMiddleware.js";
import fileRoutes from "./routes/fileRoutes.js";
import folderRoutes from "./routes/folderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./db/db.js";


try {
  const db = await connectDB('storageApp');
  const app = express();
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));
  app.use(cookieParser());

  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  app.use((req, res, next) => {
    console.log("REQ =>", req.method, req.url);
    next();
  });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  app.use("/file", authMiddleware, fileRoutes);
  app.use("/folder", authMiddleware, folderRoutes);
  app.use("/user", userRoutes);

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ err });
  });

  app.listen("80",'0.0.0.0', () => {
    console.log("Server is running on localhost port 80");
  });

} catch (err) {
  console.error("Failed to connect to MongoDB", err);
  process.exit(1);
}


