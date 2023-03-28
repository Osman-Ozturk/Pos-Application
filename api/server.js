import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import categoryRouter from "./routes/categories.js";
import productRouter from "./routes/product.js";
import billRouter from "./routes/bills.js";
import userRouter from "./routes/auth.js";
import { verifyEmail } from "./routes/auth.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const PORT = process.env.PORT || 4001;
const URL = process.env.URL || "mongodb://localhost:27017/posApplication";
const app = express();

mongoose
  .connect(URL)
  .then(() => console.log("with mongoDB connected"))
  .catch((err) => console.log(err));
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors()
);
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded succesfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/bills", billRouter);
app.use("/api/users", userRouter);
app.get("/verify/:token", verifyEmail);

app.listen(PORT, () => {
  console.log(`Server läuft ${PORT}`);
});
