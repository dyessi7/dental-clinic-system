const db = require('../config/db');

const crearHorario = async(req, res) => {
    try {
        const {doctor_id, dia_semana, hora_inicio, hora_fin} = req.body;

        const [existence] = await db.query(
            `SELECT * FROM HORARIO
            WHERE doctor_id = ? AND dia_semana = ?
            AND (
                (hora_inicio < ? AND hora_fin > ?)
                OR (hora_inicio >= ? AND hora_inicio < ?)
                OR (hora_fin > ? AND hora_fin <= ?)
            )`,
            [doctor_id, dia_semana, hora_fin, hora_inicio, , hora_inicio, hora_fin , hora_inicio, hora_fin]
        );
        
        if(existence.length > 0){
            return res.status(400).json({
                message: "El doctor ya tiene un horario asignado en este rando de tiempo."
            });
        }

        await db.query(
            'INSERT INTO HORARIO (doctor_id, dia_semana, hora_inicio, hora_fin) VALUES (?,?,?,?)',
            [doctor_id, dia_semana, hora_inicio, hora_fin]
        );
        res.status(201).json({
            message: "Bloque de horario creado exitosamente",
            horarioId: result.insertId
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al guardar el horario en la base de datos"
        });
    }
};


module.exports = {
    crearHorario
}