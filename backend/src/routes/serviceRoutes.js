const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

const {validateService} = require('../middlewares/serviceValidator');
const {verifyToken, isAdmin} =require('../middlewares/authMiddleware');

router.post('/', verifyToken, isAdmin, validateService, serviceController.createService); //RUTA CREAR
router.get('/', serviceController.listService); //RUTA VER






module.exports = router;