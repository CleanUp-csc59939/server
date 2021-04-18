const userServices = require('../services/user.js');

const doesEmailExist = () => async (email) => {
  const user = await userServices.findUserByEmail(email);
  if (user) {
    throw new Error('Email already exist');
  }
};

module.exports = {
  doesEmailExist,
};
