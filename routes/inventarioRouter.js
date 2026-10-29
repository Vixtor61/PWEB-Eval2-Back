const express = require('express');
const router = express.Router();
// configurar router
const {
    inventarioList,reservarSuministro,ListadoCarga, eliminarSuministroDeCarga
} = require('../controllers/inventarioController');


router.get('/', inventarioList)
router.post('/reservar', reservarSuministro)
router.get('/carga', ListadoCarga)
router.delete('/carga/:id', eliminarSuministroDeCarga)

module.exports = router;