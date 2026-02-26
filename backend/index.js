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
app.use(cookieParser());

// Serve uploads folder
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});
// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",     
    "https://destinationnepal-5.onrender.com",
    "https://destinationnepall.onrender.com",
  ],
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use("/api", loginRoute);
app.use("/blogs", blogRoutes);
app.use("/categories", categoryRoute);

// Error middleware (must be after all routes)


app.listen(5001, () => console.log("Server running on port 5001"));