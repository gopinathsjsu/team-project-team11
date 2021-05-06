module.exports = (mongoose) => {
    return mongoose.model('transactions', new mongoose.Schema({
            from: {type: mongoose.Schema.Types.ObjectId, ref: 'account', required: true},
            to: {type: mongoose.Schema.Types.ObjectId, ref: 'account'},
            customer: {type: mongoose.Schema.Types.ObjectId, ref: 'customer', required: true},
            amount: {type: Number, default: 0},
            isExternal: {type: Boolean, default: false},
            toExternal: {type: String, default: null},
            frequency: {type: String, default: null},
            isRecurringPayment: {type: Boolean, default: false},
            startDate: {type: Date, default: null},
            endDate: {type : Date, default: null},
            lastTransactionDate: {type: Date, default: null},
            description: {type: String, default: null},
        },
        {
            timestamps: true,
        }));
};