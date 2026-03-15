const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioController');

const {validateHorario} = require('../middlewares/horarioValidator');
const {verifyToken, isAdmin} =require('../middlewares/authMiddleware');

router.post('/', verifyToken, isAdmin, validateHorario, horarioController.crearHorario); //RUTA CREAR




module.exports = router;