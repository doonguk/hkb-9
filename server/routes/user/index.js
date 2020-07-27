const { Router } = require('express');
const { getUserController, postUserController } = require('./user-ctrl');

const router = Router();

router.get('/', getUserController);
router.post('/', postUserController);

module.exports = router;
