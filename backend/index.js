import dotenv from "dotenv";
import connectDb from "./config/db.js";
import loginRoute from "./route/loginRoute.js";
import categoryRoute from "./route/categoryRoute.js";
import blogRoutes from "./route/blogRoute.js";
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

dotenv.config();
connectDb();
const app = express();
app.use(express.json());

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
app.use(cookieParser());

const corsOptions = {
origin: [
      "http://localhost:5173",     // local frontend
      "https://destinationnepal-5.onrender.com" ,
     " https://destinationnepall.onrender.com",//deployed backend
       // deployed frontend
    ],  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api", loginRoute);

app.use("/blogs", blogRoutes);

app.use("/uploads", express.static("upload"));

app.use("/categories", categoryRoute);

app.listen(5001, () => console.log("server run in port 5001"));
