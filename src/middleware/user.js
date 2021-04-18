const userServices = require('../services/user.js');

const doesEmailExist = () => async (email) => {
  console.log(email);
  const user = userServices.findUserByEmail(email);
  if (user) {
    throw new Error('Email already exist');
  }
};

module.exports = {
  doesEmailExist,
};
