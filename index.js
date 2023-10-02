import express from "express";
import dotenv from "dotenv";
// import cors from "cors";
import { serve, setup } from "swagger-ui-express";

import connectDB from "./dbConnect.js";

import Article from "./Schemes/Article.js";

import articleRouter from "./Routes/ArticleRoutes.js";
import userRouter from "./Routes/UserRoutes.js";
import profileRouter from "./Routes/ProfileRoutes.js";
import subscribeRouter from "./Routes/SubscribeRoutes.js";

import swagger_output from "./swagger_output.json" assert { type: 'json' };

const app = express();

dotenv.config();

connectDB();

app.use(express.json());
// app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome to blogs api!<br><br><a href='/api-docs'>Go to docs</a>");
});
app.use("/api-docs/", serve, setup(swagger_output));
app.use('/api/', userRouter);
app.use('/api/articles', articleRouter);
app.use('/api/profiles', profileRouter);
app.use('/api/subscribe', subscribeRouter)
app.use('/api/tags', async (req, res) => {res.send(await Article.getAllTags())});

app.listen(5000, () => console.log("Server is running on port 5000"));