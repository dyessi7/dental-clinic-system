const { body, validationResult } = require('express-validator');
const validatePatient = [
    body('DNI')
        .isLength({min: 8, max: 8}).withMessage('El DNI debe tener 8 digitos')
        .isNumeric().withMessage('El DNI solo debe contener numeros'),
    body('nombre')
        .trim().notEmpty().withMessage('El nombre es obligatorio')
        .isAlpha('es-ES', {ignore: ' '}).withMessage('El nombre solo debe contener letras'),
    body('apellido')
        .trim().notEmpty().withMessage('El apellido es obligatorio')
        .isAlpha('es-ES', {ignore: ' '}).withMessage('El apellido solo debe contener letras'),
    body('telefono')
        .trim()
        .matches(/^(\+?51)?\s?(\d{9}|(\d{2,3})\s?\d{6,7})$/)
        .withMessage('Formato de telefono invalido para Perú'),
    body('email')
        .isEmail().withMessage('Debe ser un correo electronico válido'),
    body('direccion')
        .trim()
        .isLength({MIN: 5}).withMessage('Error de direccion. Muy corta.'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array().map(err => err.msg)
            });
        }
        next();
    }
];




module.exports = {
    validatePatient
}