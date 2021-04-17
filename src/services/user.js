const db = require('../database');

const createUser = async (data) => {
  console.log(db);
  const user = await db.User.create(data);
  return user;
};

module.exports = {
  createUser,
};
