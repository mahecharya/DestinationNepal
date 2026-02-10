import dotenv from "dotenv"
import connectDb from "./config/db.js";
import loginRoute from "./route/loginRoute.js"
import express from "express"


dotenv.config()
connectDb()


const app = express();

app.use(express.json());

app.use("/api", loginRoute);

app.listen(5001, () =>
  console.log("server run in port 5001")
);