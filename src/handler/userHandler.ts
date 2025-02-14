import express from "express"
import { showData, showAllUsers } from "../controllers/userContoller";
const userHandler = express.Router();


userHandler.get("/dataById", showData);
userHandler.get("/showAll", showAllUsers);

export default userHandler;
