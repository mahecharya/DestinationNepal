import jwt from "jsonwebtoken"

const generateToken=(userid)=>{
return jwt.sign({id:userid},process.env.secretkey,{expiresIn:"7d"})
}

export default generateToken