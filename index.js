import express from "express";
import mongoose from "mongoose";
import cron from "node-cron";

import connectDB from "./dbConnet.js";

import Article from "./Schemes/Article.js";

import articleRouter from "./Routes/ArticleRoutes.js";

// const bodyParser = require("body-parser");
const app = express();

connectDB();

cron.schedule('0 0 * * * *', () => {console.log('running')});

app.use(express.json());
app.use('/article', articleRouter);

app.use('/test', async (req, res) => {res.send(await Article.find().exec())})

app.listen(5000, () => console.log("Server is running on port 5000"));