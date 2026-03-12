const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.post('/', serviceController.createService); //RUTA CREAR
router.get('/', serviceController.listService); //RUTA VER





module.exports = router;