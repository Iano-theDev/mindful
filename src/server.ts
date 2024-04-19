// const express = require('express');
// const dotenv = require('dotenv');
import express, {Express, Request, Response} from "express"
import dotenv from "dotenv"

// load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const current_user = process.env.CURRENT_USER;

app.get('/', (req: Request, res: Response) => {
    res.send(`Current developer is ${current_user}`);
})

app.listen(port, () => {
    console.log(`[Server]: Server is running at http://localhost:${port}`);
})
