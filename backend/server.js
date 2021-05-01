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
    req.session = {scope: null};
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
    ['get', 'customer', handler.getCustomer, 'customer'],
    ['post', 'customer', handler.createCustomer, null],
    ['post', 'loginCustomer', handler.loginCustomer, null],
    ['put', 'updateCustomer', handler.updateCustomer, 'customer'],
    ['post', 'loginAdmin', handler.loginAdmin, null],
    ['post', 'file', handler.uploadFile, null],
    ['get', 'file/:id', handler.getFile, null],
    ['post', 'addAccount', handler.addAccount, 'customer'],
    ['get', 'accountRequests', handler.getAccountRequests, 'admin'],
    ['post', 'approveAccountRequest', handler.approveAccountRequest, 'admin'],
    ['get', 'accounts', handler.getAllAccounts, 'admin'],
    ['get', 'accountDetails', handler.getAccountDetails, 'customer'],
    ['post', 'accountBalance', handler.updateAccountBalance, 'admin'],
    ['post', 'transferAmount', handler.transferAmount, 'customer'],
    ['post', 'transferExternalAmount', handler.transferExternalAmount, 'customer'],
    ['get', 'transactions', handler.getTransactions, 'customer'],
].forEach((r) => {
    app[r[0]]("/apiV1/" + r[1], async (req, res, next) => {
        if (r[3] !== null && r[3] !== req.session.scope) {
            res.status(401).json({err: 'You cannot access!'});
            return;
        }
        try {
            await r[2](req, res);
        } catch (e) {
            //Dont show message in prod
            res.status(500).json({err: 'Something went wrong! ' + e.message});
            console.log(e);
            next();
        }
    });
});


app.listen(parseInt(process.env.PORT));
module.exports = app; // used by mocha tests
