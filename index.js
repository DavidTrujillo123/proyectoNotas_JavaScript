// Paquetes
const express = require('express')
const cors = require('cors')
const app = express()


//middlewears
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

//Puerto
app.set("port", process.env.PORT || 3003)

//Rutas
app.use(require('./ruotes/routes'))

//Ejecución del servidor web
app.get('*/*', function (req, res) {
  res.send('Hello World')
})
app.listen(app.get('port'))
console.log ('Direccion de acceso: \nhttp://localhost:'+app.get('port'))

//Produccion 
module.exports = app

