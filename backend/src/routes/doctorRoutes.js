const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const {validateDoctor} = require('../middlewares/doctorValidator');
const {verifyToken, esrol} = require('../middlewares/authMiddleware');

router.post('/', verifyToken, esrol('ADMINISTRADOR'), validateDoctor, doctorController.registrarDoctor); //RUTA CREAR

module.exports = router;

