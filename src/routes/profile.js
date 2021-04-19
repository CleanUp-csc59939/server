const express = require('express');
const profileController = require('../controllers/profile.js');
const validatorErrors = require('../middleware/validatorErrors');

const router = new express.Router();

/**
 * @module api/profile
 */

router.get('/:id', [validatorErrors], profileController.getProfile);

router.patch('/:id', [validatorErrors], profileController.editProfile);

module.exports = router;