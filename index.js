const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()

app.use(morgan('dev'))
app.set('port',process.env.PORT || 4500)
app.use(express.json())
//rutas
app.get('/',(req,res)=>{
  res.send('Hola mundo')
})
app.use('/vehiculos', require('./routes/vehiculos'))
app.use('/tipo_linea', require('./routes/tipo_linea'))
app.use('/tipo_marca', require('./routes/tipo_marca'))

app.listen(app.get('port'), ()=>{
  console.log('servidor corriendo en puerto '+app.get('port'))
})


