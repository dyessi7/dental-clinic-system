const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const {validatePatient} = require('../middlewares/patientValidator');


router.post('/', validatePatient, patientController.createPatient);


module.exports = router;