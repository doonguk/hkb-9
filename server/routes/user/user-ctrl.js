const pool = require('../../config/db');
const User = require('../../model/user');
const { createPasswordHash } = require('../../utils/salt');

exports.createUserController = async (req, res, next) => { // create user
  try {
    const { loginId, password } = req.body;
    const connection = await pool.getConnection();
    if (await User.checkUserExist(connection, loginId)) {
      res.status(409).json('');
      return;
    }

    const passwordHash = await createPasswordHash(password);
    await User.createUser(connection, {
      loginId,
      passwordHash,
    });
    res.status(201).json('');
  } catch (e) {
    next(e);
  }
};

exports.loginController = async (req, res, next) => {
  console.log(req.user);
};
