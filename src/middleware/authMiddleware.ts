import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { CustomRequest, UserPayload } from "../config/types";
import { configDotenv } from "dotenv";
configDotenv()

export const validateToken =  (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => { 
  if (!process.env.SECRET_TOKEN) {
     res.status(401).json({
      message: "Invalid secret token",
    });
    return
  }
  
   const token = req.cookies.token;
   console.log("requested token is ", token)
  try {
    
    const tokenDecoded = verify(token, process.env.SECRET_TOKEN)as UserPayload;
    console.log("decode token data : ", tokenDecoded)
    req.user = tokenDecoded;
    console.log("the user id found in middleware is : ", req.user.userId)
    next();
  } catch (error) {
     res.status(401).json({ message: " You are not authorized" });
     return;
  }
};
