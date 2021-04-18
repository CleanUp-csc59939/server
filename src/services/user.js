const db = require('../database');

const createUser = async (data) => {
  const user = await db.User.create(data);
  return user;
};

const findUserByEmail = async (email) => {
  const user = db.User.findOne({ where: { email } });
  return user;
};

module.exports = {
  createUser,
  findUserByEmail,
};
