let mongoose = require('mongoose');

const types= ['CREDIT', 'DEBIT']

let TransactionSchema = new mongoose.Schema({
    amount: {
        type:Number,
        required:true
    },
    balance: {
        type:Number,
        required:true
    },
    type: {
        type: String,
        enum: types
    },
    description:{
        type: String
    },
    walletId: {
        type: mongoose.Types.ObjectId,
        ref: 'wallet',
        required: true
    }
},{timestamps: { createdAt: 'date' }});

TransactionSchema.statics.CONSTANTS = {};
TransactionSchema.statics.CONSTANTS.CREDIT = types[0];
TransactionSchema.statics.CONSTANTS.DEBIT = types[1];

module.exports.Transaction = mongoose.model('Transaction', TransactionSchema);