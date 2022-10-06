const e = require('express')
const { db } = require('../cnn')

//Consulta de todos los datos
const getEstudiantes = async (req, res) => {
    const consultas = 'SELECT * from estudiantes;'
    const response = await db.query(consultas)
    res.status(200).json(response)
}

//Consulta de un estudiante por cedula
const getEstudianteByCedula = async (req,res) => {
    const consulta = 'SELECT * FROM estudiantes WHERE est_cedula LIKE $1;'
    try {
        const cedula = req.params.cedula
        const response = await db.one(consulta, [cedula])
        res.status(200).json(response)
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: 'No se ha enconstrado ningún estudiante con la cédula: ' + req.params.cedula
        })
    }
}

//Ingresar estudiantes
const postEstudiante = async (req, res) => {
    const consulta = "INSERT INTO estudiantes VALUES ($1, $2, $3, $4) RETURNING *;"
    try {
        const estudiante = req.body
        console.log(estudiante)
        const response = await db.one(consulta, [estudiante.cedula, estudiante.nombres,
        estudiante.apellidos, estudiante.nacimiento])
        res.status(201).json({
            message: 'Estudiante ingresado correctamente',
            body: response
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }
}

//Actualizar datos por cedula
const putEstudiante = async (req, res) => {
    const consulta = "UPDATE estudiantes SET est_nombre = $2, est_apellidos = $3,"
        +'est_nacimiento = $4 WHERE est_cedula = $1 RETURNING *;'
    try {
        const estudiante = req.body
        const response = await db.one(consulta, [
            estudiante.cedula, 
            estudiante.nombres,
            estudiante.apellidos, 
            estudiante.nacimiento
        ])
        res.status(200).json({
            message: 'Estudiante actualizado correctamente',
            body: response
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }
}

//Eliminar datos por cedula
const deleteEstudiante = async (req, res) => {
    const consulta = 'DELETE FROM estudiantes WHERE est_cedula LIKE $1;'
    try {
        const cedula = req.params.cedula
        const response = await db.query(consulta, [cedula])
        res.status(200).json({
            message: 'El estudiante con cédula ' + cedula + ' se ha eliminado correctamente'
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: 'No se ha enconstrado ningún estudiante con la cédula: ' + req.params.cedula
        })
    }
}


module.exports = {
    getEstudiantes,
    getEstudianteByCedula, 
    postEstudiante,
    putEstudiante,
    deleteEstudiante
}