const {body, validationResult} = require('express-validator');

const validateHorario = [
    body('doctor_id')
        .isInt().withMessage('Id de doctor no valido'),
    body('dia_semana')
        .notEmpty().withMessage('El dia es obligatorio'),
    body('hora_inicio')
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Hora de inicio invalida'),
    body('hora_fin')
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Hora de fin invalida')

    .custom((value, {req}) => {
        if(value <= req.body.hora_inicio){
            throw new Error('La hora de fin debe ser mayor a la hora de inicio')
        }
        return true;
    }),
    
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
    validateHorario
}