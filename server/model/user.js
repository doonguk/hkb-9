exports.checkUserExist = async (connection, name) => {
  const [user] = await connection.query(`SELECT * FROM user WHERE name='${name}'`);
  // db response 형식은 [result, something..] -> 필요한건 result
  if (user[0]) {
    return true;
  }
  return false;
};

exports.createUser = async (connection, name) => {
  const [insertId] = await connection.query(`INSERT INTO user(name) VALUES('${name}')`);
  return insertId;
};
