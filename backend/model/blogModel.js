import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },category: {
    type: String, 
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Login", 
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);

