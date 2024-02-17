const {Transaction} = require('../models/transaction');
const {Wallet} = require('../models/wallet');
const CustomError = require('../utils/CustomError');
const {CONSTANTS} = Transaction;


module.exports.addTransaction = async ({ walletId, amount, description, isNewWallet } = {}) => {
    const wallet = await Wallet.findById(walletId);

    if (!wallet) {
        throw new CustomError('NotFoundError', 'Wallet not found');
    }

    const transactionType = amount > 0 ? CONSTANTS.CREDIT : CONSTANTS.DEBIT;

    let balance = calculateNewBalance(wallet.balance, amount);
    console.log('balance :: ', balance);
    if (balance < 0) {
        throw new CustomError('ValidationError', 'Invalid transaction, Insufficient funds in the wallet');
    }

    const transaction = new Transaction({
        amount,
        walletId,
        description,
        type: transactionType,
        balance: isNewWallet ? wallet.balance : balance,
    });

    await transaction.save();

    if (!isNewWallet) {
        // If it's not a new wallet, update the wallet's balance
        await Wallet.updateOne({ _id: wallet._id }, { balance });
    }

    return transaction;
};


module.exports.getTransaction = async ({ walletId, skip = 0, limit = 10, order = 1, sortBy = 'date' } = {}) => {
    const wallet = await Wallet.findById(walletId);

    console.log('sortBy :: ', sortBy, ' order :: ', order);
    if (!wallet) {
        throw new CustomError('NotFoundError', 'Wallet not found');
    }

    const totalNumber = await Transaction.countDocuments({ walletId });

    const transactions = await Transaction.find({ walletId })
        .sort({ [sortBy]: Number(order) })
        .skip(parseInt(skip))
        .limit(parseInt(limit));

    const totalPages = Math.ceil(totalNumber / limit);

    return {
        transactions,
        totalNumber,
        totalPages,
    };
};



function calculateNewBalance(currentBalance, amount) {
    // Validate input: ensure that currentBalance and amount are numbers
    if (isNaN(currentBalance) || isNaN(amount)) {
        throw new Error('Invalid input. Both currentBalance and amount must be numbers.');
    }
    // Calculate the new balance
    const newBalance = Number(currentBalance) + Number(amount);
    // Round the new balance to 4 decimal places
    const roundedNewBalance = Number(newBalance.toFixed(4));

    return roundedNewBalance;
}


