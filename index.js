// Paquetes
const express = require('express')
const app = express()
//const cors = require('cors')

//middlewears
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(cors())

//Puerto
app.set("port", process.env.PORT || 3001)

//Rutas
app.use(require('./ruotes/routes'))

//Ejecución del servidor web
app.get('*/*', function (req, res) {
  res.send('Hello World')
})
app.listen(app.get('port'))
console.log ('Direccion de acceso: \nhttps://localhost:'+app.get('port'))

//Produccion 
module.exports = app

