const {
    Customer, Account
} = require('../mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {err} = require('../util');

const saltRounds = 10;
const expiresIn = 1008000;

const signPayload = (payload) => {
    const jwtSecret = process.env.JWT_SECRET;
    return jwt.sign(payload, jwtSecret, {expiresIn});
};

module.exports = {
    getCustomer: async (req, res) => {
        const customer = await Customer.findById(req.session.user._id)
            .populate('Account');
        res.json(customer);
    },
    createCustomer: async (req, res) => {
        const password = await bcrypt.hashSync(req.body.password, saltRounds);
        const customer = new Customer({...req.body, password});
        try {
            const user = await customer.save();
            const payload = {user, scope: 'customer'};
            const token = signPayload(payload);
            res.json({token, user});
        } catch (e) {
            if (e.code === 11000) {
                res.status(400).json(err('Email id is already taken'));
            } else {
                throw e;
            }
        }
    }
};