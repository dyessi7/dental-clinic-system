const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());


//RUTAS
//RUTA SERVICIO
const serviceRoutes = require('./routes/serviceRoutes');
app.use('/api/servicios', serviceRoutes);

//RUTA PACIENTE
const patientRoutes = require('./routes/patientRoutes');
app.use('/api/pacientes', patientRoutes);



app.get('/',(req, res)=>{
    res.send('Servidor de Clinica dental funcionando');
});



//....FIN
module.exports = app;