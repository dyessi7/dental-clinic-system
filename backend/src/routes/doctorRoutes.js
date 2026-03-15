const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const {validateDoctor} = require('../middlewares/doctorValidator');
const {verifyToken, isAdmin} = require('../middlewares/authMiddleware');

router.post('/', verifyToken, isAdmin, validateDoctor, doctorController.registrarDoctor); //RUTA CREAR

module.exports = router;

