module.exports = (mongoose) => {
    return mongoose.model('customer', new mongoose.Schema({
            name: {type: String, required: true},
            email: {type: String, required: true, index: {unique: true}},
            password: {type: String, required: true},
            profilePic: {type: String}
        },
        {
            timestamps: true,
            toJSON: {
                transform: (doc, ret) => {
                    delete ret.password;
                },
            },
        }));
};