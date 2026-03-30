const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
const {validateCita} = require('../middlewares/citaValidator');
const {verifyToken, esrol} = require('../middlewares/authMiddleware');

router.post('/', verifyToken, esrol('RECEPCIONISTA'), validateCita, citaController.crearCita); //RUTA CREAR

module.exports = router;

