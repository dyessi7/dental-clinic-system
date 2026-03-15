const {body, validationResult} = require('express-validator');

const validateUser = [
    body('nombre')
        .trim().notEmpty().withMessage('El nombre es obligatorio')
        .isAlpha('es-ES', {ignore: ' '}).withMessage('El nombre solo debe contener letras'),
    body('apellido')
        .trim().notEmpty().withMessage('El apellido es obligatorio')
        .isAlpha('es-ES', {ignore: ' '}).withMessage('El apellido solo debe contener letras'),
    body('email')
        .isEmail().withMessage('Debe ser un correo electronico válido'),
    body('DNI')
        .isLength({min: 8, max: 8}).withMessage('El DNI debe tener 8 digitos')
        .isNumeric().withMessage('El DNI solo debe contener numeros'),
    body('telefono')
        .trim()
        .matches(/^(\+?51)?\s?(9\d{8}|0\d{1,2}\s?\d{6,7})$/)
        .withMessage('Formato de telefono invalido para Perú'),
    body('direccion')
        .trim()
        .isLength({MIN: 5}).withMessage('Error de direccion. Muy corta.'),
    
];

module.exports = {
    validateUser
};