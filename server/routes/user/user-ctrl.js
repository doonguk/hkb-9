const pool = require('../../config/db');
const User = require('../../model/user');

exports.getUserController = (req, res) => {
  res.status(200).json({ name: 'bong', age: 900 });
};

exports.postUserController = async (req, res) => { // create user
  const { name } = req.body;
  const connection = await pool.getConnection();
  await User.checkUser(connection, name);
};
