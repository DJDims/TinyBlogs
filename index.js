import express from "express";
import mongoose from "mongoose";
import cron from "node-cron";
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

// cron.schedule('0 0 * * * *', () => {console.log('running')});

app.use(express.json());
// app.use('/', async (req, res) => { res.send("It works!")});
app.use('/api/', userRouter);
app.use('/api/articles', articleRouter);
app.use('/api/profiles', profileRouter);
app.use('/api/tags', async (req, res) => {res.send(await Article.getAllTags())});

app.use('/test', verifyToken, async (req, res) => {console.log(req.user)})

app.listen(5000, () => console.log("Server is running on port 5000"));