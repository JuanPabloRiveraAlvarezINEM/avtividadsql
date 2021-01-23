const {Router} = require('express')
const vehiculos = Router()
const conexion = require('../config/conexion')

vehiculos.post('/30_registros',async(req,res)=>{
  const {
    NRO_PLACA,
    MODELO,
    FECHA_VEN_SEGURO,
    FECHA_VEN_TECNOMECANICA,
    FECHA_VEN_CONTRATODO
  } = req.body
  if(NRO_PLACA && MODELO && FECHA_VEN_SEGURO && FECHA_VEN_TECNOMECANICA && FECHA_VEN_CONTRATODO){
    id_linea = Math.floor(Math.random()*(31-1)+1)
    await conexion.promise().query('INSERT INTO vehiculos VALUES (?,?,?,?,?,?)',[NRO_PLACA,id_linea,MODELO,FECHA_VEN_SEGURO,FECHA_VEN_TECNOMECANICA,FECHA_VEN_CONTRATODO],(err,resulset)=>
      {
       if(err){
        res.send('ERROR EN PETICION')
       }else{
        res.send('ECHO')
       }
     })
    }else{
     res.send('Peticion sin datos')
  }
})


//cantidad de modelos
vehiculos.get('/cantidad_modelos', async(req,res)=>{
  await conexion.query('select MODELO, count(MODELO) as total from vehiculos group by MODELO order by 2 desc', (err,resulset,camp)=>{
    if(err){
      res.json('ERROR EN LA CONSULTA')
    }else{
       res.json(resulset)
    }
  })
})

//Evaluar cantidades
vehiculos.get('/evaluar_cantidades',(req,res)=>{
  conexion.query('SELECT COUNT(ID_LINEA) FROM tipo_linea' ,(err,result,fields)=>{
    try{
      if(result[0]['COUNT(ID_LINEA)'] == 20)res.send('cantidad correcta')
      else res.send('cantidad incorrecta')
    }catch(e){
      res.send("ERROR")
    }
  })
  conexion.query('SELECT COUNT(NRO_PLACA) FROM vehiculos' ,(err,result,fields)=>{
    try{
      if(result[0]['COUNT(NRO_PLACA)'] == 30)res.send('Cantidad correcta')
      else res.send('Cantidad incorrecta')
    }catch(e){
      res.send("ERROR")
    }
  })
  conexion.query('SELECT COUNT(ID_MARCA) FROM tipo_linea' ,(err,result,fields)=>{
    try{
      if(result[0]['COUNT(ID_MARCA'] == 5)res.send('cantidad correcta')
      else res.send('Cantidad incorrecta')
    }catch(e){
      res.send("ERROR")
    }
  })
})

vehiculos.get('/fechas', (req,res)=>{
  conexion.query('SELECT * FROM vehiculos ORDER BY fecha_ven_seguro',(err, resulset)=>{
    if(err){
        res.send('ERROR')
    }else{
        res.json({resulset})
    }
  }) 
})

vehiculos.post('/rango_vehiculos',(req,res)=>{
  const {
    modelos
  } = req.body
  conexion.query('SELECT * FROM vehiculos WHERE modelo = ?',[modelos],(err,resulset,camp)=>{
    if(err){
      res.send('ERROR')
    }else{
      res.json({resulset})
    }
  })
})


module.exports = vehiculos
