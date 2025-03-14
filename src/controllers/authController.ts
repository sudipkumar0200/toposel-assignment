import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { signUpInput, signInInput } from "../config/inputValidator";
import { user } from "../models/userModel";
import dotenv from "dotenv";
dotenv.config();

export const authSignUp = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsedBody = signUpInput.safeParse(req.body);
    if (!parsedBody.success) {
      res.status(401).json({ message: "Invalid Emali or Password" });
      return;
    }

    const userExist = await user.findOne({
      email: parsedBody.data.email,
    });
    if (userExist) {
      res
        .status(401)
        .json({ message: "An account with this email already exists" });
      return;
    }
    const hashedPasswd = await bcrypt.hash(parsedBody.data.password, 10);
    await user.create({
      userName:parsedBody.data.userName,
      fullName:parsedBody.data.fullName,
      email: parsedBody.data.email,
      password: hashedPasswd,
      gender:parsedBody.data.gender,
      DOB:parsedBody.data.DOB,
      country:parsedBody.data.country
    });

    res.status(201).json({
      message: "Registration successful. Please remember your email",
    });
  } catch (error) {
    console.log("Error while creating account!!", error);
    res.sendStatus(500);
  }
};

export const authSignIn = async (req: Request, res: Response) => {
  try {
    const parsedBody = signInInput.safeParse(req.body);
    if (!parsedBody.success) {
      res.status(401).send({ message: "Invalid Emali or Password" });
      return;
    }

    const userExist = await user.findOne({
      email: parsedBody.data.email,
    });
    if (!userExist) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    const comparePasswd = bcrypt.compare(
      parsedBody.data.password,
      userExist.password
    );

    if (!comparePasswd) {
      res.status(401).json({
        message: "Invalid password",
      });
      return;
    }

    if (!process.env.SECRET_TOKEN) {
      res.status(401).json("Invalid jwt-secret for has NULL value");
      return;
    }
    const authToken = sign(
      {
        userId: userExist._id,
        userName: userExist.userName,
      },
      process.env.SECRET_TOKEN,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", authToken)
    res.status(200).send({ message: "Login successful"});
  } catch (error) {
    res.send(500);
    console.log("Error while signIn account!!", error);
  }
};

