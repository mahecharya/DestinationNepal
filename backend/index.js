import dotenv from "dotenv"
import connectDb from "./config/db.js";
import loginRoute from "./route/loginRoute.js"
import blogRoutes from "./route/blogRoute.js"
import express from "express"
import cors from "cors"
import path from "path";



dotenv.config()
connectDb()
const app = express();
app.use(express.json());

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));


const corsOptions={
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions))

app.use("/api", loginRoute);

app.use("/blogs", blogRoutes);




app.listen(5001, () =>
  console.log("server run in port 5001")
);