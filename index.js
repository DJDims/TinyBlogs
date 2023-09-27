import express from "express";
import dotenv from "dotenv";

import connectDB from "./dbConnect.js";

import Article from "./Schemes/Article.js";

import articleRouter from "./Routes/ArticleRoutes.js";
import userRouter from "./Routes/UserRoutes.js";
import profileRouter from "./Routes/ProfileRoutes.js";

import { verifyToken } from "./Middleware/VerifyToken.js";

const app = express();

dotenv.config();

connectDB();

app.use(express.json());

app.use('/api/', userRouter);
app.use('/api/articles', articleRouter);
app.use('/api/profiles', profileRouter);
app.use('/api/tags', async (req, res) => {res.send(await Article.getAllTags())});

app.listen(5000, () => console.log("Server is running on port 5000"));