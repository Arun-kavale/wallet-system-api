const router = require('express').Router();
const tryCatch = require('../../utils/tryCatch');
const {addTransaction, getTransaction} = require('../../controllers/transactionController');

// We have the option to handle this as a transaction, making it more versatile. However, adding it as a trasact because it is mentioned in the doc
router.post("/transact/:walletId",tryCatch(addTransaction));
router.get("/transaction",tryCatch(getTransaction));
module.exports = router;