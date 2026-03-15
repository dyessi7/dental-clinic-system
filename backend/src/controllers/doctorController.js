const db = require ('../config/db');

const registrarDoctor = async (req, res) => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
        const {nombre, apellido, email, DNI, telefono, direccion, especialidad, nroColegiatura} = req.body;
        const [userResult] = await connection.query(
            'INSERT INTO USUARIO(nombre, apellido, email, DNI, telefono, direccion) VALUES (?,?,?,?,?,?)',
            [nombre, apellido, email, DNI, telefono, direccion || null]
        );

        const newUserId = userResult.insertId;

        await connection.query(
            'INSERT INTO ROL_USUARIO (rol_id, usuario_id) VALUES(?,?)',
            [2, newUserId] 
        );
        
        await connection.query(
            'INSERT INTO DOCTOR (doctor_id, especialidad, nroColegiatura) VALUES (?,?,?)',
            [newUserId, especialidad, nroColegiatura]
        );
        await connection.commit();

        res.status(201).json({
            message: "Doctor registrado exitosamente",
            userId: newUserId
        });
    }
    catch (error) {
        await connection.rollback();
        console.error("Error en registro: ", error);

        if(error.code === 'ER_DUP_ENTRY'){
            return res.status(400).json({
                message: "Duplicacion de datos: intente de nuevo."
            });
        }
        res.status(500).json({
            message: "Error al registrar el doctor."
        });
    }
    finally{
        connection.release();
    }
};


module.exports = {
    registrarDoctor
}