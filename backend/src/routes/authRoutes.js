const express = require('express');
const router = express.Router();

const {validateLogin} = require('../middlewares/authValidator');
const authController = require('../controllers/authController');

router.post('/login', validateLogin, authController.login);

module.exports = router;