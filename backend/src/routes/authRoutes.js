const express = require('express');
const router = express.Router();

const {validateLogin} = require('../middlewares/authValidator');
const authController = require('../controllers/authController');

router.post('/login', valitateLogin, authController);

module.exports = router;