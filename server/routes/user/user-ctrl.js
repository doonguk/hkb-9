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
  try {
    const { loginId, password } = req.body;
    const passwordHash = await createPasswordHash(password);
    const connection = await pool.getConnection();
    const user = await User.findOne(connection, loginId);
    if (!user) {
      res.status(404).json(''); // 없는 유저
      return;
    }
    if (passwordHash.password === user.password) {
      next();
    }
    res.status(403).json(''); // 비번 틀림
  } catch (e) {
    next(e);
  }
};
