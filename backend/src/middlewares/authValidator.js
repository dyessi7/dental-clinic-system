const {body, validationResult} =require('express-validator');

const validateLogin = [
    body('email')
        .isEmail().withMessage('Debe ingresar un formato correcto')
        .notEmpty().withMessage('El correo electronico es obligatorio'),
    body('password')
        .notEmpty().withMessage('Ingrese constraseña'),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array().map(err => err.msg)
            });
        }
        next();
    }
];

module.exports = {
    validateLogin
};