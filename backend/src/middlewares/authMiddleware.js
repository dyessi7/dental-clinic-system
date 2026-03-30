const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if(!token) {
        return res.status(403).json({
            message: 'No se proporcionó un token'
        });
    }

    try{
        const pureToken = token.split(' ')[1] || token;
        const decoded = jwt.verify(pureToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error){
        return res.status(401).json({
            message: 'Token invalido o expirado'
        });
    }
};

const isAdmin = (req, res, next) => {
    if(req.user.rol !== 'ADMINISTRADOR'){
        return res.status(403).json({
            message: 'Requiere ser Administrador'
        });
    }
    next();
};

const isRecepcionista = (req, res, next) => {
    if(req.user.rol !== 'RECEPCIONISTA'){
        return res.status(403).json({
            message: 'Requiere ser Reepcionista'
        });
    }
    next();
}

const esrol = (rolPermitido) => {
    return (req, res, next) => {
        if(req.user.rol !== rolPermitido){
        return res.status(403).json({
            message: `Requiere ser ${rolPermitido}`
        });
    }
    next();
    }
} 

module.exports = {
    verifyToken,
    esrol
}