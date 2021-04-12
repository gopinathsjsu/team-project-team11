module.exports = (mongoose) => {
    return mongoose.model('account', new mongoose.Schema({
            isActive: {type: Boolean, default: false},
            customer: {type: mongoose.Schema.Types.ObjectId, ref: 'customer', required: true},
            balance: {type: Number, default: 0},
            type: {
                type: String,
                enum: ['saving', 'checking'],
                default: 'saving',
            },
            files: [{type: String, required: true}]
        },
        {
            timestamps: true,
        }));
};