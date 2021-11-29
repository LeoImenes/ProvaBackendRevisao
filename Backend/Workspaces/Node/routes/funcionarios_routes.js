const express = require('express')
const router = express.Router()

const funcionario_controll = require('../controll/funcionario_controll.js')
router.get('/funcionario', funcionario_controll.all)
router.get('/funcionario/:id', funcionario_controll.get_id)
router.post('/funcionarios', funcionario_controll.add_funcionario)
router.delete('/funcionario/:id', funcionario_controll.delete_funcionario)
router.put('/funcionario', funcionario_controll.uptd_funcionario)

module.exports = router