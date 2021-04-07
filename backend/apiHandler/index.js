const {
    Customer, Account
} = require('../mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {err} = require('../util');
const multer = require('multer');
const path = require("path");
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
    },
    loginCustomer:  async (req, res) => {
        const { email, password } = req.body;
        const user = await Customer.findOne({ email });
        if (user === null) {
            res.status(401).json(err('Email id doesn\'t exist'));
        } else {
            bcrypt.compare(password, user.password, (e, doseMatch) => {
                if (doseMatch) {
                    const payload = { user, scope: 'customer' };
                    const token = signPayload(payload);
                    res.json({ token, user });
                } else {
                    res.status(401).json(err('Email password doesn\'t match'));
                }
            });
        }
    },
    uploadFile: async (req, res) => {
        const upload = multer({ dest: 'uploads/' }).array('files', 5);
        upload(req, res, (e) => {
            if (e) {
                res.status(400).json(err('Error while uploading file'));
            } else {
                res.json({
                    files: req.files.map((f) => f.filename),
                    originalFiles: req.files.map((f) => f.originalname),
                });
            }
        });
    },
    getFile: async (req, res) => {
        const fileId = req.params.id;
        // TODO: file path injection
        res.sendFile(path.join(__dirname, '../uploads', fileId));
    },
};