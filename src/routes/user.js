const express = require('express');
const userController = require('../controllers/user.js');

const router = new express.Router();

/**
 * Login user
 * @memberof module:api/users
 * @name POST /register
 */
router.post('/register', userController.register);

/**
 * Login user
 * @memberof module:api/users
 * @name POST /login
 */
router.post('/login', userController.login);

module.exports = router;
