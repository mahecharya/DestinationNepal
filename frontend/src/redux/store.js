import { configureStore } from "@reduxjs/toolkit";
import token from "./feature/Userauthenticate.js"

 const store =configureStore({
    reducer:{
       authenticate:token 
    }
 })
 export default store