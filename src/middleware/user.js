const userServices = require('../services/user.js');

const doesEmailExist = (shouldExist) => async (email, { req }) => {
  const user = await userServices.findUserByEmail(email);
  if (shouldExist && !user) {
    throw new Error('Email not found');
  }
  if (!shouldExist && user) {
    throw new Error('Email already exist');
  }
  if (user) {
    req.user = user;
  }
};

const checkPassword = () => async (password, { req }) => {
  if (password !== req.user.password) {
    throw new Error('Incorrect password');
  }
};

module.exports = {
  doesEmailExist,
  checkPassword,
};
