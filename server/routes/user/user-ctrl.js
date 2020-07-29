const crypto = require('crypto');
const pool = require('../../config/db');
const User = require('../../model/user');

function generateRandomHash(length) {
  return crypto
    .randomBytes(length)
    .toString('base64')
    .replace(/[^A-Za-z0-9]/g, '');
}

function createPasswordHash(password) {
  return new Promise((resolve, reject) => {
    try {
      const salt = generateRandomHash(64);
      crypto.pbkdf2(password, salt, 104236, 64, 'sha512', (err, key) => {
        if (err) {
          reject(err);
        }
        resolve({ password: key.toString('base64'), salt });
      });
    } catch (e) {
      reject(e);
    }
  });
}

exports.getUserController = (req, res) => {
  res.status(200).json({ name: 'bong', age: 900 });
};

exports.postUserController = async (req, res, next) => { // create user
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
