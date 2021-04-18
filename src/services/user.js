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
  const user = db.User.findOne({ where: { email } });
  return user;
};

module.exports = {
  createUser,
  findUserByEmail,
  getJwtToken,
};
