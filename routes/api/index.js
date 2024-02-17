var router = require('express').Router();
router.use('/api/v1/wallet', require('./wallet'));
router.use('/api/v1', require('./transaction'));

module.exports = router;