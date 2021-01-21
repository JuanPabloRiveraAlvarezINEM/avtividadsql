const {Router} = require('express')
const tipo_linea = Router()
const conexion = require('../config/conexion')

tipo_linea.post('/20_registros', async(req,res)=>{
  const {desc_linea,activo} = req.body
  const id_marca = Math.floor(Math.random(6-1)+1)
  await conexion.promise().query('INSERT INTO tipo_linea VALUES (NULL,?,?,?)',[desc_linea,id_marca,activo]) 
})

module.exports = tipo_linea
