var mongoose = require('mongoose');

let WalletSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    balance: {
        type: Number,
        required: true
    }
},{timestamps: { createdAt: 'date' }});

module.exports.Wallet = mongoose.model('Wallet', WalletSchema);