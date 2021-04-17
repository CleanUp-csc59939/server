const userServices = require('../services/user.js');

/**
 * @type {RequestHandler}
 */
const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = {
      email,
      password,
    };
    const user = await userServices.createUser(data);
    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

/**
 * @type {RequestHandler}
 */
const login = (req, res, next) => {
  try {
    return res.json();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
};
