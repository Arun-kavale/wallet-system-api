const {addTransaction: addTransactionService, getTransaction: getTransactionService} = require("../services/transactionService")
const CustomError = require('../utils/CustomError');

module.exports.addTransaction = async (req,res) => {
    console.log('INside setupwallet');
    let {amount, description} = req.body;
    let { walletId } = req.params;

    if(!amount) {
        throw new CustomError('ValidationError','Invalid Request, please check the required paramenter');
    }
    const data = await addTransactionService({amount, description, walletId});
    res.send(data);
}

module.exports.getTransaction = async (req,res) => {
    let { walletId, skip, limit, order, sortBy } = req.query;
    console.log('getTransaction :: ', order, ' :: ', sortBy);
    const data = await getTransactionService({walletId, skip, limit, order, sortBy});
    res.send(data);
}

