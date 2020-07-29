const { Router } = require('express');
const passport = require('passport');
const { validateUserBody } = require('../../utils/validation');
const { createUserController, loginController } = require('./user-ctrl');

const router = Router();

router.post('/', validateUserBody, createUserController);
router.post('/login', validateUserBody, passport.authenticate('local'), loginController);

module.exports = router;
