const app = require('./app')
const db =require('./config/db')

const PORT = process.env.PORT || 3000;

async function startServer(){
    try {
        await db.query('SELECT 1');
        console.log('Conexion exitosa. Mysql funcionando');
        app.listen(PORT, () => {
            console.log("Servidor corriendo en http://localhost:${PORT}");
        });
    }
    catch(err){
        console.error('Error en la BD. No se pudo iniciar el servidor', err.message);
        process.exit(1);
    }
}
startServer();
