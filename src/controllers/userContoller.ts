import { Response } from "express";
import { CustomRequest } from "../config/types";
import { user } from "../models/userModel";

export const showData = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.userId;
  try {
    const data = await user.findOne({
      _id: userId,
    });
    
    res.status(200).send({ message: "Your data found : ", data });
  } catch (error) {
    res.status(500).send({ message: "No user Data found!!!!" });
    return;
  }
};

export const showAllUsers = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const data = await user.find(); 
    res.status(200).send({ message: "Users data found : ", data });
  } catch (error) {
    res.status(500).send({ message: "There is no User Data!!" });
    return;
  }
};
