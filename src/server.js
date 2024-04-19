const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;
const current_user = process.env.CURRENT_USER;

app.get('/', (req, res) => {
    res.send(`Current user is ${current_user}`);
})

app.listen(port, () => {
    console.log(`[Server]: Server is running at http://localhost:${port}`);
})
