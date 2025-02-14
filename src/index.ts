import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import dbConnect from "./config/db";
import usersRoute from "./routes/usersRoute";
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
dbConnect();
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", usersRoute);
app.get("/", (req, res) => {
  res.json("Welcome to Toposel API...")
})

app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`);
});

export default app;