const express = require('express')
const cors = require('cors')
const inventario = require('./routes/inventarioRouter')


const app = express()
const port = 3000
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use('/api/health', (req, res) => {
  res.status(200).json({ health: 'ok' })
});

app.use('/api/inventario', inventario)



app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
})
