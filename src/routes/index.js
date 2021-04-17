const express = require('express');
const userRoutes = require('./user.js');

const router = new express.Router();

// just to make sure routes are connected
router.use('/welcome', (req, res) => {
  console.log(req);
  res.status(200).send('hello world');
});

/**
 * API Routes Go Here
 * example:
 * const helloRoutes = require('./hello.js');
 * router.use('/hello', helloRoutes);
 */
router.use('/user', userRoutes);

router.use('*', (req, res) => {
  console.log(req);
  res.status(404).json({ errors: [{ msg: 'Unknown API route' }] });
});

module.exports = router;
