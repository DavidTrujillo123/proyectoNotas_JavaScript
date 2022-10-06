const { response } = require('express')
const { db } = require('../cnn')

//consultas
const getNotas = async (req, res) => {
    const consultas = 'SELECT * from notas'
    const response = await db.query(consultas)
    res.json(response)
}

//View
const getNotasNombres = async (req, res) => {
    const consulta = 'SELECT * FROM notas_nombre_apellidos ORDER BY concat'
    const response = await db.query(consulta)
    res.status(200).json(response)
}

//Actualizar
const putNotas = async (req, res) => {
    const consulta = "UPDATE notas SET not_proyectos = $2, not_deberes = $3,"
        +'not_examenes = $4 WHERE not_est_cedula = $1 RETURNING *;'
    try {
        const notas = req.body
        const response = await db.one(consulta, [ 
            notas.cedula,
            notas.proyectos,
            notas.deberes, 
            notas.examenes
        ])
        res.status(200).json({
            message: 'Notas actualizadas correctamente',
            body: response
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }
}

//Insertar notas
const postNotas = async (req, res) => {
    const consulta = "INSERT INTO notas (not_proyectos, not_deberes, not_examenes, not_est_cedula) VALUES ($1,$2,$3,$4) RETURNING *;"
    try {
        const notas = req.body
        const response = await db.one(consulta, [ 
            notas.proyectos, 
            notas.deberes,
            notas.examenes,
            notas.cedula
            
        ])
        res.status(201).json({
            message: "Notas ingresadas correctamente",
            body: response
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }
}

//Eliminar notas
const deleteNotas = async (req, res) => {
    const consulta = 'DELETE FROM notas WHERE not_est_cedula LIKE $1;'
    try {
        const notas_cedula = req.params.cedula
        const response = await db.query(consulta, [notas_cedula])
        res.status(200).json({
            message: 'Las notas han sido eliminada correctamente'
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: 'No se ha enconstrado ningún estudiante con la cédula: ' + req.params.cedula
        })
    }
}

module.exports = {
    getNotas,
    getNotasNombres,
    putNotas,
    postNotas,
    deleteNotas
}