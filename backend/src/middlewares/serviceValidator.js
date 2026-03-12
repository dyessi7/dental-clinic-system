const { body, validationResult } = require("express-validator");

const validateService = [
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre del servicio es obligatorio')
        .isLength({min: 6}).withMessage('El nombre debe ser mas descriptivo')
        .isAlpha('es-ES', {ignore: ' '}).withMessage('El nombre solo debe contener letras'),
    body('costo')
        .notEmpty().withMessage('El precio es obligatorio')
        .isFloat({min: 0}).withMessage('El precio debe ser un numero positivo'),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                erros: errors.array().map(err => err.msg)
            });
        }
        next(); 
    }
];

module.exports = {
    validateService
}