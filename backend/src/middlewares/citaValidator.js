const {body, validationResult} = require ('express-validator');

const validateCita = [
    body('paciente_id')
        .isInt().withMessage('El ID del paciente debe ser un numero entero'),
    body('doctor_id')
        .isInt().withMessage('El ID del doctor debe ser un numero entero'),
    body('servicio_id')
        .isInt().withMessage('El ID del servicio debe ser un numero entero'),
    body('usuario_id')
        .isInt().withMessage('El ID del usuario debe ser un numero entero'),
    body('fecha')
        .isDate().withMessage('La fecha no es valida').custom((value) => {
            const hoy = new Date();
            const local = hoy.toLocaleDateString('en-CA');
            if(value < local){
                throw new Error('No puedes programar una cita en una fecha pasada');
            }
            return true;
        }),
    body('hora_inicio').matches(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/)
        .withMessage('La hora de inicio debe tener un formato valido(HH:mm)'),
    body('hora_fin').matches(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/)
        .withMessage('La hora de fin debe tener un formato valido (HH:mm)'),
    body('precio_aplicado').isFloat({min:0}).withMessage('El prrecio debe ser un numero positivo'),

    (req, rest, next) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return rest.status(400).json({errors: errors.array()});
            }
            next();
    }
    
];

module.exports = {
    validateCita
}
