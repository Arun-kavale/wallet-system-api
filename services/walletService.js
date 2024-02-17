const mongoose = require('mongoose');
const {Wallet} = require('../models/wallet');
const TransactionService = require('./transactionService');
const CustomError = require('../utils/CustomError');

module.exports.setupWallet = async ({name, balance} = {}) => {
    if(balance < 0) {
        throw new CustomError('ValidationError', `Invalid trasaction, Balance cannot be in the nagative`)
    }
    const wallet =  new Wallet({name, balance})
    await wallet.save();
    const {_id: transactionId, date} = await TransactionService.addTransaction({walletId: wallet._id, amount: balance, isNewWallet: true, description:''});
    const walletObject = wallet.toObject();
    return {
        _id: walletObject._id,
        name: walletObject.name,
        balance: walletObject.balance,
        transactionId,
        date
    }
}


module.exports.getWallet = async({walletId} = {}) => {
    const wallet = await Wallet.findById(walletId);
    if (!wallet) {
        throw new CustomError('ValidationError', `Wallet not found `);
    }
    return wallet;
}