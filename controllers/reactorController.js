
//const helper = require('../utils/helpers');

const Inventario = require('../data/inventario');
const Reserva = require('../data/reserva');
const inventario = new Inventario();
const Nave = require('../data/nave');
const my_nave = new Nave("Nave1", 1000);



const generarRandom = () => {
     return Math.round(Math.random() * 100)
}
let temperature =  generarRandom()

const adjust = (req, res) => {
    try {
        console.log('Cuerpo de la solicitud:', req.body);
        const { temperature_usr } = req.body;

        
         if (temperature_usr == temperature){
            res.status(200).json({"res": "estabilizado"})
        }
        if (temperature_usr > temperature){
            res.status(200).json({"res": "más alta"})
        }
         if (temperature_usr < temperature){
            res.status(200).json({"res": "más baja"})
        }
    
    } catch (error) {
        console.error('Error al realizar la reserva:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


const reboot = (req, res) => {
    try {
        temperature = generarRandom()
        res.status(200).json({"res": "Reiniciado"})
    
    } catch (error) {
        console.error('Error al realizar la reserva:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}




module.exports = {reboot,adjust};