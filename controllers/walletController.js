const {setupWallet: setupWalletService, getWallet: getWalletService} = require("../services/walletService")
const CustomError = require('../utils/CustomError');

module.exports.setupWallet = async (req,res) => {
    console.log('INside setupwallet');
    let {name, balance} = req.body;
    balance = Number(balance).toFixed(4);
    if(!name  || !balance) {
        throw new CustomError('ValidationError','Invalid Request, please check the required paramenter');
    }
    const data = await setupWalletService({name, balance});
    res.send(data);
}

module.exports.getWallet = async(req,res) => {
    let {walletId} = req.params;

    if(!walletId) {
        throw new CustomError('ValidationError','Invalid Request, please check walletId');
    }
    const data = await getWalletService({walletId});
    res.send(data);
}