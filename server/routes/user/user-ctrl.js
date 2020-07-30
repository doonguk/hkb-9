const pool = require('../../config/db');
const User = require('../../model/user');

exports.getUserController = (req, res) => {
  res.status(200).json({ name: 'bong', age: 900 });
};

exports.postUserController = async (req, res, next) => { // create user
  try {
    const { name } = req.body;
    const connection = await pool.getConnection());
    if (await User.checkUserExist(connection, name)) {
      res.status(409).json('');
      return;
    }
    await User.createUser(connection, name);
    res.status(201).json({ name });
  } catch (e) {
    next(e);
  }
};
