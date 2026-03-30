const db = require('../config/db');
const crearCita = async (req, res) => {

    const {paciente_id, doctor_id, servicio_id, fecha, hora_inicio, hora_fin, precio_aplicado} = req.body;

    const usuario_id = req.user.id;

    const codigo_cita = `CIT-${Math.random().toString(36).substring(2,8).toUpperCase()}`;

    try {
        const [servicios] = await db.query('SELECT buffer, costo, duracion FROM SERVICIO WHERE servicio_id = ?', [servicio_id]);
        
        if (servicios.length === 0){
            return res.status(404).json({
                message: "El servicio seleccionado no existe"
            });
        }
    
        const {buffer, costo, duracion} = servicios[0];

        if(hora_inicio >= hora_fin){
            return res.status(400).json({
                message: "La hora de fin debe ser posterior a la hora de inicio"
            });
        }
        
        const ahora = new Date();
        const fechaCita = new Date(`${fecha}T${hora_inicio}`);
        if(fechaCita < ahora){
            return res.status(400).json({
                message: "La hora ya pasó"
            });
        }

        if(parseFloat(precio_aplicado) !== parseFloat(costo)){
            return res.status(400).json({
                message: `Precio incorrecto. El servicio cuesta ${costo} soles.`
            })
        }

        const [h_ini, m_ini] = hora_inicio.split(':').map(Number);
        const [h_fin, m_fin] = hora_fin.split(':').map(Number);
        const minutosSer = (h_fin * 60 + m_fin) - (h_ini * 60 + m_ini);

        //minutosSer !== duracion
        if(minutosSer < duracion){
            return res.status(400).json({
                message: `Duración insuficiente. Este servicio requiere mínimo ${duracion} minutos.`
            })
        }

        const [conflictor] = await db.query(
            `
            SELECT * FROM CITA
            WHERE doctor_id = ? AND fecha = ?
            AND (
                ? < ADDTIME(hora_fin, SEC_TO_TIME(? * 60)) AND ? > hora_inicio
                )
            AND (
                estado IN ('CONFIRMADA', 'FINALIZADA')
                OR (estado = 'RESERVADA' AND fecha_creacion > NOW() - INTERVAL 20 MINUTE)
                )
            `,
            [doctor_id, fecha, hora_inicio, buffer, hora_fin]
        );

        if (conflictor.length > 0) {
            return res.status(400).json({
                message: "El horario no esta disponible"
            });
        }

        const[result] = await db.query(
            `
            INSERT INTO CITA(
                            paciente_id, doctor_id, servicio_id, usuario_id,
                            fecha, hora_inicio, hora_fin, precio_aplicado, codigo_cita, estado
                            )
            VALUES (?,?,?,?,?,?,?,?,?, 'RESERVADA')
            `,
            [paciente_id, doctor_id, servicio_id, usuario_id, fecha, hora_inicio, hora_fin, precio_aplicado, codigo_cita]
        );

        res.status(201).json({
            message: "Cita creada exitosamente",
            codigo: codigo_cita,
            cita_id: result.insertId,
            expira_en: 20
        });
    }
    catch(error) {
        console.error("Error en Transaccion de cita:", error);
        res.status(500).json({
            message:"No se pudo registrar la cita. Intente mas tarde"
        });
    }
};

module.exports = {
    crearCita
}