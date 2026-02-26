import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT), // Ensure this is a number
  secure: process.env.SMTP_PORT == "465" ? true : false, // SSL for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP Connection Failed:", err);
  } else {
    console.log("✅ SMTP Server is Ready");
  }
});

export default transporter;