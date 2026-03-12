const db = require('../config/db');

const createService = async (req, res) => {
    try {
        const {nombre, duracion, costo, buffer} = req.body;
        const sql = 'INSERT INTO SERVICIO (nombre, duracion, costo, buffer) VALUES (?,?,?,?)';
        const [result] = await db.query(sql, [nombre, duracion, costo, buffer]);
        res.status(201).json({
            message: "¡Servicio registrado con exito!",
            id: result.insertId
        });
    } catch(err){
        res.status(500).json({
            error: "Hubo un error: " + err.message
        });
    }
};

const listService = async (req, res) => {
    try {
        const[rows] = await db.query('SELECT * FROM SERVICIO');
        res.json(rows);
    }
    catch (err) {
        res.status(500).json({
            error: "Error: " + err.message
        });
    }
};
module.exports={
    createService,
    listService
};