module.exports = (mongoose) => {
    const customerSchema = new mongoose.Schema({
            name: {type: String, required: true},
            email: {type: String, required: true, index: {unique: true}},
            password: {type: String, required: true},
            profilePic: {type: String},
            accounts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Account'}],
        },
        {
            timestamps: true,
            toJSON: {
                transform: (doc, ret) => {
                    delete ret.password;
                },
            },
        });

    return mongoose.model('customer', customerSchema);
};