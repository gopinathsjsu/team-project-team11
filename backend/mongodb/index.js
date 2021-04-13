const mongoose = require('mongoose');

console.log('Using mongo connection string', process.env.MONGODB_CONNECTION);

mongoose.connect(process.env.MONGODB_CONNECTION,
    {autoIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

mongoose.connection.on('error', () => {
    console.log('Mongo error');
});
mongoose.connection.once('open', () => {
    console.log('Connected to mongo');
});

// Import and re-export models here

const Customer = require('./schemas/customer')(mongoose);
const Account = require('./schemas/account')(mongoose);
const Transactions = require('./schemas/transactions')(mongoose);

module.exports = {
    Customer,
    Account,
    Transactions
};