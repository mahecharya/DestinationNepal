import jwt from "jsonwebtoken"

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.secretkey, {
    expiresIn: "7d",
  });
};
export default generateToken