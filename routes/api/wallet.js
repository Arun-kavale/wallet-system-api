const router = require('express').Router();
const tryCatch = require('../../utils/tryCatch');
const {setupWallet, getWallet} = require('../../controllers/walletController');

router.post("/setup",tryCatch(setupWallet));
router.get("/:walletId",tryCatch(getWallet));
module.exports = router;