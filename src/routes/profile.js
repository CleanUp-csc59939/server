const express = require('express');

const profileController = require('../controllers/profile.js');
const profileMiddleware = require('../middleware/profile.js');
const validatorErrors = require('../middleware/validatorErrors');

const router = new express.Router();

/**
 * @module api/profile
 */

router.get('/:id', [validatorErrors], profileController.getProfile);

router.patch('/:id', [validatorErrors], profileController.editProfile);

router.patch('/:id/img', [profileMiddleware.upload.single('file'), validatorErrors], profileController.editImage);

router.delete('/:id/img', [validatorErrors], profileController.deleteImage);

module.exports = router;
