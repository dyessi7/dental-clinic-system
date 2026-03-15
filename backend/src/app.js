const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());


//RUTAS

////RUTA LOGIN
app.use('/api/auth', require('./routes/authRoutes'));

//RUTA SERVICIO
app.use('/api/servicios', require('./routes/serviceRoutes'));

//RUTA PACIENTE
app.use('/api/pacientes', require('./routes/patientRoutes'));

//RUTA DOCTOR
app.use('/api/doctor', require('./routes/doctorRoutes'));


app.get('/',(req, res)=>{
    res.send('Servidor de Clinica dental funcionando');
});



//....FIN
module.exports = app;