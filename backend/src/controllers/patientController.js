const db = require ('../config/db');

const createPatient = async(req, res) => {
    try {
        const {nombre, apellido, email, DNI, telefono, direccion, sexo} = req.body;
        const sql = 'INSERT INTO PACIENTE (nombre, apellido, email, DNI, telefono, direccion, sexo) VALUES (?,?,?,?,?,?,?)';
        const [result] = await db.query(sql, [nombre, apellido,email,DNI,telefono,direccion,sexo]);
        res.status(201).json({
            message: "Paciente registrado con exito",
            id: result.insertID
        });
    }
    catch(err){
        res.status(500).json({
            error: "Hubo un error de registro: " + err.message
        });
    }
};




module.exports = {
    createPatient
};
