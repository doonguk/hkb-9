const { Router } = require('express');
const { validateUserBody } = require('../../utils/validation');
const { createUserController, loginController } = require('./user-ctrl');

const router = Router();

router.post('/', validateUserBody, createUserController);
router.post('/login', validateUserBody, loginController);

module.exports = router;
