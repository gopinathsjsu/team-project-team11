require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
}));

const apiVersion = '/apiV1';


// Handle errors
app.use((err, req, res, next) => {
    console.log(err);
    if (err) {
        const { message } = err;
        res.status(500).json({ err: 'Something went wrong!', message });
    }
    next();
});

app.listen(parseInt(process.env.PORT));
module.exports = app; // used by mocha tests
