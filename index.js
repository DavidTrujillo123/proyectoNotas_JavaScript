// Paquetes
const express = require('express')
const app = express()

//middlewears
app.use(express.json())
app.use(express.urlencoded({extended: true}))

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

