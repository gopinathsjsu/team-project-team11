module.exports = (mongoose) => {
    const accountSchema = new mongoose.Schema({
            balance: {type: Number},
            type: {type: String},
        },
        {
            timestamps: true,
        });

    return mongoose.model('account', accountSchema);
};