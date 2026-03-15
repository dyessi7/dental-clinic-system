const {body, validationResult} = require('express-validator');
const {validateUser} = require('./userValidator');

const validateDoctor = [
    ...validateUser,
    body('especialidad')
        .notEmpty().withMessage('Especialidad: obligatorio'),
    body('nroColegiatura')
        .isNumeric().withMessage('La colegiatura debe ser un numero'),
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
    validateDoctor
}