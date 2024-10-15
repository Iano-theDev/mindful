// index.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const db = require('./db')
const UserMoldel = require('./userModel')
require('dotenv').config();

const app = express();

// app.use(express.json())

const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL;
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;
const SECRET_KEY = process.env.SECRET_KEY

app.post('/login', express.json(), async (req, res) => {
    const { name, password } = req.body


    console.log(req.body)
    if (!name || !password) {
        return res.status(400).send({ message: 'name and password are required' });
    }

    // const user = users.find(x => x.name === name)
    const user = await UserMoldel.findOne({ name: name })
    console.log("users", user)
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user.id, name: user.name, access: user.allowed_services }, SECRET_KEY, { expiresIn: '1h' })
        res.status(200).json({ message: "sign in successful", token: token })
    } else {
        res.status(401).json({ message: "invalid credentials, please try again" })
    }
})

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "access denied, please log in" })
    }
    try {
        console.log("SECRET_KEY", SECRET_KEY)
        console.log("TOKEN", token)
        
        const user = jwt.verify(token, SECRET_KEY)
        req.user = user
        console.log("User is", user)
        next()
    } catch (error) {
        console.log("Token verification failed, ", error)
        res.status(401).json({ error: 'Invalid token', error });
    }

}

const verifyAccess = (requiredAccess) => {
    console.log("inside access verifieer middlwware");
    return (req, res, next) => {
        const user = req.user;

        if (user && user.access && user.access.includes(requiredAccess)){
            console.log(`Access granted for ${requiredAccess}`);
            next()
        } else {
            console.log(`Access denied for ${requiredAccess}`);
            res.status(403).json({message: "access forbiden. contact your admin"})
        }
    }
}

app.use('/users-api', verifyToken, verifyAccess('users'), createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true
}));

app.use('/orders-api', verifyToken,  createProxyMiddleware({
    target: ORDER_SERVICE_URL,
    changeOrigin: true
}));

app.use('/products-api', verifyToken, verifyAccess('inventory'), createProxyMiddleware({
    target: PRODUCT_SERVICE_URL,
    changeOrigin: true
}));

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
    console.log('API Gateway running on http://localhost:3000');
});
