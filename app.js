const express = require('express')
const inventario = require('./routes/inventarioRouter')


const app = express()
const port = 3000
app.use(express.json());
app.use('/api/inventario', inventario)



app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
})
