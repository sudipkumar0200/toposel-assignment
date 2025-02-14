import express from "express"
import { validateToken } from "../middleware/authMiddleware";
import userHandler from "../handler/userHandler";
const usersRouter = express.Router();


usersRouter.use("/users",validateToken, userHandler)



export default usersRouter;