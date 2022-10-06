//Importaciones
const { Router } = require('express')
const { getNotas, getNotasNombres, postNotas, deleteNotas, putNotas} = require('../controllers/notas.controllers')
const { getEstudiantes, postEstudiante, getEstudianteByCedula, putEstudiante, deleteEstudiante } = require('../controllers/estudiantes.controllers')
const router = Router()

const URLV1 = '/v1'

//Rutas notas V1
router.get(URLV1 + '/notas', getNotas)
router.get(URLV1 + '/estudiantes/notas', getNotasNombres)
router.post(URLV1 + '/notas', postNotas)
router.put( URLV1 + '/notas', putNotas)
router.delete(URLV1 + '/notas/:cedula', deleteNotas)

//Rutas estudiantes V1
router.get(URLV1 + '/estudiantes', getEstudiantes)
router.get(URLV1 + '/estudiantes/:cedula', getEstudianteByCedula)
router.post(URLV1 + '/estudiantes', postEstudiante)
router.put(URLV1 + '/estudiantes', putEstudiante)
router.delete(URLV1 + '/estudiantes/:cedula', deleteEstudiante)


//Ruta
module.exports = router