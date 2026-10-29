const express = require('express');
const router = express.Router();
// configurar router
const {
    inventarioList,reservarSuministro,ListadoCarga, eliminarSuministroDeCarga,actualizarUnidadesDeCarga
} = require('../controllers/inventarioController');


router.get('/', inventarioList)
router.post('/reservar', reservarSuministro)
router.get('/carga', ListadoCarga)
router.delete('/carga/:id', eliminarSuministroDeCarga)
router.put('/carga/:id', actualizarUnidadesDeCarga)

module.exports = router;