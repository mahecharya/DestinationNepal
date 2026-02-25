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
  likes:[{
     type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  rating:[{
     user:{type: mongoose.Schema.Types.ObjectId ,ref:"user"},
     value:{
      type:Number,
      required:true,
      min:1,
      max:5
     }
  }],
  averageRating:{
    type:String,
    default:0
  }
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);

