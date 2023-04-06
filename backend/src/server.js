import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRouter from "./route/web";
import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'

import connectDB from "./config/connectDB";

let app = express()
app.use(cors({origin:true}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

configViewEngine(app)

initWebRouter(app)

connectDB()

let port = process.env.PORT || 2000
app.listen(port, () => {
    console.log(`${port}`);
})