require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const handler = require('./apiHandler');

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
}));

[
    ['get', '/customer/:id', handler.getCustomer],
    ['post', '/customer', handler.createCustomer],
].forEach((r) => {
    app[r[0]](r[1], async (req, res, next) => {
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
