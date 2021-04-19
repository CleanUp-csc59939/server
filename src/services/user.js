const jwt = require('jsonwebtoken');
const db = require('../database');

const JWT_OPTIONS = {
  expiresIn: '24h',
};
const secretKey = 'secret';

const getJwtToken = (paylod) =>
  new Promise((resolve, reject) =>
    jwt.sign(paylod, secretKey, JWT_OPTIONS, (err, token) => (err ? reject(err) : resolve(token))),
  );
const createUser = async (data) => {
  const user = await db.User.create(data);
  return user;
};

const findUserByEmail = async (email) => {
  const user = await db.User.findOne({ where: { email } });
  return user;
};

const emailTaken = async (email) => {
  const user = await findUserByEmail(email);
  if (user) {
    console.log(user);
    return true;
  }
  return false;
};

const updateEmail = async (email, id) => {
  await db.User.update(
    {
      email,
    },
    { where: { id } },
  );
};

const deleteUser = async (id) => {
  const user = await db.User.findOne({ where: { id } });
  await user.destroy();
};

const getAllUsers = async () => {
  const users = await db.User.findAll();
  return users;
};

module.exports = {
  createUser,
  findUserByEmail,
  getJwtToken,
  emailTaken,
  updateEmail,
  deleteUser,
  getAllUsers,
};
