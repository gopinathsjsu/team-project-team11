require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const handler = require('./apiHandler');

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
}));

app.use((req,
         res,
         next) => {
    const token = req.header('authorization');
    req.session = {};
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            res.status(401).json(err('You need to login, your session has expired'));
        }
        req.session = jwt.decode(token);
    }
    next();
});

[
    ['get', 'customer', handler.getCustomer],
    ['post', 'customer', handler.createCustomer],
].forEach((r) => {
    app[r[0]]("/apiV1/" + r[1], async (req, res, next) => {
        try {
            await r[2](req, res);
        } catch (e) {
            //Dont show message in prod
            res.status(500).json({err: 'Something went wrong! ' + e.message});
            next();
        }
    });
});


app.listen(parseInt(process.env.PORT));
module.exports = app; // used by mocha tests
