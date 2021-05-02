const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/user.js');
const userMiddleware = require('../middleware/user.js');
const validatorErrors = require('../middleware/validatorErrors');

const router = new express.Router();

/**
 * @module api/users
 */

/**
 * Register user
 * @memberof module:api/users
 * @name POST /register
 */
router.post(
  '/register',
  [
    check('email', 'Erorr with email').isEmail().custom(userMiddleware.doesEmailExist(false)),
    check('password', 'Password input field required'),
    validatorErrors,
  ],
  userController.register,
);

/**
 * Login user
 * @memberof module:api/users
 * @name POST /login
 */
router.post(
  '/login',
  [
    check('email', 'Erorr with email').isEmail().custom(userMiddleware.doesEmailExist(true)),
    check('password', 'Password input field required').custom(userMiddleware.checkPassword()),
    validatorErrors,
  ],
  userController.login,
);

/**
 * Delete user
 * @memberof module:api/users
 * @name DELETE /:id
 */
router.delete('/:id', [validatorErrors], userController.deleteUser);

/**
 * Get all users
 * @memberof module:api/users
 * @name GET /all
 */
router.get('/all', [validatorErrors], userController.getAllUsers);

module.exports = router;
