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
  const payload = {
    id: req.user.id,
    email: req.user.email,
  };

  return userServices
    .getJwtToken(payload)
    .then((token) =>
      res.json({
        sucess: true,
        token: `Bearer ${token}`,
      }),
    )
    .catch((err) => next(err));
};

/**
 * @type {RequestHandler}
 */
const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await userServices.deleteUser(id);
    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
  deleteUser,
};
