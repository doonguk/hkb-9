exports.checkUserExist = async (connection, loginId) => {
  const [user] = await connection.query(
    `SELECT * FROM user WHERE login_id='${loginId}'`,
  );
  if (user[0]) {
    return true;
  }
  return false;
};

exports.findOne = async (connection, loginId) => {
  const [user] = await connection.query(`SELECT * FROM user WHERE login_id=${loginId} limit 1`);
  return user[0];
};

exports.createUser = async (connection, option) => {
  const { loginId, passwordHash: { password, salt } } = option;
  const [insertId] = await connection.query(
    `INSERT INTO user(login_id, password, salt, refresh_token) VALUES('${loginId}', '${password}', '${salt}', 'temp')`,
  );
  return insertId;
};
