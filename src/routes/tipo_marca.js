const {Router} = require('express')
const tipo_marca = Router()
const conexion = require('../config/conexion')

//En la tabla TIPO_MARCA deberá insertar 5 registros
tipo_marca.post('/insertar_5_registros', async(req,res)=>{
  const {desc_marca,activo} = req.body
  const arreglo ={
    desc_marca,
    activo
  }
  await conexion.promise().query('INSERT INTO tipo_marca SET ?',[arreglo],(err,resulset,camp)=>{
    if(err){
      res.send('error')
    }else{
      res.send('echo')
    }
  })
})



module.exports = tipo_marca
