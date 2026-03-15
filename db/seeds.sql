-- 1. LIMPIEZA TOTAL EN ORDEN
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE COMPROBANTE;
TRUNCATE TABLE PAGO;
TRUNCATE TABLE CITA;
TRUNCATE TABLE PACIENTE;
TRUNCATE TABLE SERVICIO_DOCTOR;
TRUNCATE TABLE SERVICIO;
TRUNCATE TABLE HORARIO;
TRUNCATE TABLE DOCTOR;
TRUNCATE TABLE ROL_USUARIO;
TRUNCATE TABLE ROL;
TRUNCATE TABLE USUARIO;
SET FOREIGN_KEY_CHECKS = 1;

-- 2. INSERTAR ROLES (Según tu ENUM)
INSERT INTO ROL (rol_id, nombre_rol) VALUES 
(1, 'ADMINISTRADOR'), 
(2, 'DOCTOR'),
(3, 'RECEPCIONISTA'),
(4, 'CAJERO');

-- 3. USUARIOS INICIALES (Contraseña para todos: 'Password123!')
-- Nota: He incluido nombres y apellidos según tu tabla
INSERT INTO USUARIO (usuario_id, nombre, apellido, email, DNI, telefono, direccion, password_hash) VALUES 
(1, 'Yessica', 'Admin', 'admin@clinica.com', '12345678', '987654321', 'Av. Principal 123', '$2b$10$dfF7Q2MuhkDMbvIKA1zseOsmqG577kibqCobqKBBPEoEhtN2WFcqG'),
(2, 'Pamela', 'Gomez', 'roberto.doc@clinica.com', '87654321', '912345678', 'Calle Los Doctores 456', '$2b$10$dfF7Q2MuhkDMbvIKA1zseOsmqG577kibqCobqKBBPEoEhtN2WFcqG');

-- 4. VINCULAR ROLES
INSERT INTO ROL_USUARIO (rol_id, usuario_id) VALUES 
(1, 1), -- Yessica es Admin
(2, 2); -- Roberto es Doctor

-- 5. PERFIL DE DOCTOR (Necesario para el usuario 2)
INSERT INTO DOCTOR (doctor_id, especialidad, nroColegiatura) VALUES 
(2, 'Odontología General', 456789);

-- 6. SERVICIOS PROFESIONALES
INSERT INTO SERVICIO (nombre, duracion, costo, buffer) VALUES 
('Consulta Diagnóstica', 30, 50.00, 10),
('Profilaxis Adulto', 45, 120.00, 15),
('Extracción Simple', 60, 150.00, 10),
('Resina Fotocurado', 45, 180.00, 5);

-- 7. UN PACIENTE DE PRUEBA (Para probar tus Citas luego)
INSERT INTO PACIENTE (nombre, apellido, email, DNI, telefono, direccion, sexo) VALUES 
('Juan', 'Perez', 'juan.perez@email.com', '44556677', '900111222', 'Jr. Las Flores 789', 'MASCULINO');

-- 8. ASIGNAR SERVICIOS AL DOCTOR
-- Vamos a decir que el Dr. Roberto (ID: 2) hace Consulta y Profilaxis
INSERT INTO SERVICIO_DOCTOR (doctor_id, servicio_id, estado) VALUES 
(2, 1, 'ACTIVO'), -- Consulta Diagnóstica
(2, 2, 'ACTIVO'); -- Profilaxis Adulto