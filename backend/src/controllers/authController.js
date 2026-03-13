const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    

    try{
        const { email, password } = req.body;
        const query = `
        SELECT u.*, r.nombre_rol as rol
        FROM USUARIO u
        JOIN ROL_USUARIO ro ON u.usuario_id = ro.usuario_id
        JOIN ROL r ON ro.rol_id = r.rol_id
        WHERE u.email = ? 
        `;
        const [users] = await db.execute(query, [email]);
        const user = users[0];

        if(!user){
            return res.status(404).json({
                message: "Usuario no existe. Pruebe nuevamente"
            })
        }

        const ahora = new Date();
        if (user.bloqueado_hasta && user.bloqueado_hasta > ahora){
            return res.status(403).json({
                message: `Cuenta bloqueada. Intenta de nuevo despues de: ${user.bloqueado_hasta.toLocaleTimeString()}`
            })
        }
        const match = await bcrypt.compare(password, user.password_hash);

        if (!match){
            let nuevosIntentos = user.intentos_fallidos + 1;
            let queryUpdate = 'UPDATE USUARIO SET intentos_fallidos = ? WHERE usuario_id = ?';
            let paramsUpdate = [nuevosIntentos, user.usuario_id];

            if(nuevosIntentos >=3){
                const tiempoBloqueo = new Date(Date.now() + 15 * 60000);
                queryUpdate = 'UPDATE USUARIO SET intentos_fallidos = ?, bloqueado_hasta = ? WHERE usuario_id = ?';
                paramsUpdate = [nuevosIntentos, tiempoBloqueo, user.usuario_id]
            }
            await db.execute(queryUpdate, paramsUpdate);

            return res.status(401).json({
                mesagge: `Constraseña incorrecta. Intento ${nuevosIntentos} de 3.`
            });
        }
        await db.execute('UPDATE USUARIO SET intentos_fallidos = 0, bloqueado_hasta = NULL WHERE usuario_id = ?', [user.usuario_id]);

        res.status(200).json({
            message: "Bienvenido al sistema",
            rol: user.rol,
            redirect: `/${user.rol.toLowerCase()}/dashboard`
        });
    }
    catch (error){
        console.error(error);
        res.status(500).json({
            mesagge: "Error en el servidor"
        });
    }
}

module.exports = {login};