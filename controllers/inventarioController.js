
//const helper = require('../utils/helpers');

const Inventario = require('../data/inventario');
const Reserva = require('../data/reserva');
const inventario = new Inventario();
const Nave = require('../data/nave');
const my_nave = new Nave("Nave1", 1000);


const inventarioList = (req, res) => {
   let invent = { suministros: inventario.getInventario()
    };

    res.status(200).json(invent);
 
}

const naveInfo = (req, res) => {
    let nave = { nombre: my_nave.nombre, creditos: my_nave.creditos, reservas: my_nave.reservas };
    res.status(200).json(nave);
}
const reservarSuministro = (req, res) => {
    try {
        console.log('Cuerpo de la solicitud:', req.body);
        const { suministroId, cantidad } = req.body;
        console.log('suministroId:', suministroId, 'cantidad:', cantidad);
        const suministro = inventario.findSuministroById(suministroId);
        console.log('Suministro encontrado:', suministro);
        if (!suministro) {
            return res.status(404).json({ error: 'Suministro no encontrado' });
        }

        
         

        if (cantidad <= 0 || cantidad > suministro.stock) {
            return res.status(400).json({ error: 'Cantidad inválida' });
        }

        let precioTotal = 0;
         for (const reserva of my_nave.reservas) {
            console.log(reserva)
            const suministro = inventario.findSuministroById(reserva.id);
            let totalreserva = suministro.precio * reserva.cantidad;
            precioTotal += totalreserva;
        }
        if (precioTotal + (suministro.precio * cantidad) > my_nave.creditos) {
                return res.status(400).json({ error: 'No hay suficientes créditos para realizar la operación' });
            }

        // Crear reserva y agregarla a la nave

        //reserva = new Reserva(suministroId, cantidad);
        try {
            if(inventario.agregarReserva(suministroId, cantidad)) {
            console.log('Reserva agregada al inventario:', suministroId, cantidad);
            my_nave.agregarReserva(suministro, cantidad);
            res.status(200).json({ message: 'Reserva realizada correctamente' });
        }
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
        
    } catch (error) {
        console.error('Error al realizar la reserva:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}



const ListadoCarga = (req, res) => {
    let precioTotal = 0;
    try {
        for (const reserva of my_nave.reservas) {
            console.log(reserva)
            const suministro = inventario.findSuministroById(reserva.id);
            let totalreserva = suministro.precio * reserva.cantidad;
            precioTotal += totalreserva;
        }
        console.log("Precio total:sss " + precioTotal)
        res.status(200).json({ 
            creditos: my_nave.creditos, 
            items: my_nave.reservas,
            precioTotal });
        }
    catch (error) {
        console.error('Error al obtener el listado de carga:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

}

const eliminarSuministroDeCarga = (req, res) => {
    try {
        params = req.params;
        console.log('Parametros de la solicitud:', params);
        if (!params || !params.id) {
            return res.status(400).json({ error: 'ID de suministro no proporcionado' });
        }
      
        const  suministroId = params.id;


        const suministro = inventario.findSuministroById(suministroId);
        console.log('Suministro encontrado:', suministro);
        console.log('Reservas actuales de la nave:', my_nave.reservas);
        let reserva = my_nave.reservas.find(reserva => reserva.id == suministroId);
        console.log('Reserva encontrada:', reserva);
        if (!suministro || !reserva) {
            return res.status(404).json({ error: 'Suministro no encontrado en la carga' });
        }
        const cantidad = reserva.cantidad;
        console.log('Cantidad a eliminar de la reserva:', cantidad);
        suministro.reserva -= cantidad;
        my_nave.reservas = my_nave.reservas.filter(reserva => reserva.id != suministroId);


        res.status(200).json({ message: 'Suministro eliminado de la carga correctamente' });
    } catch (error) {
        console.error('Error al eliminar el suministro de la carga:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

}


const actualizarUnidadesDeCarga = (req, res) => {
    try {
        params = req.params;
        console.log('Parametros de la solicitud:', params);
        if (!params || !params.id) {
            return res.status(400).json({ error: 'ID de suministro no proporcionado' });
        }
        let { cantidad } = req.body;
      
        const  suministroId = params.id;


        const suministro = inventario.findSuministroById(suministroId);
        console.log('Suministro encontrado:', suministro);
        
        console.log('Reservas actuales de la nave:', my_nave.reservas);

        let precioTotal = 0;
         for (const reserva of my_nave.reservas) {
            console.log(reserva)
            const suministro = inventario.findSuministroById(reserva.id);
            let totalreserva = suministro.precio * reserva.cantidad;
            precioTotal += totalreserva;
        }
       

        let reserva = my_nave.reservas.find(reserva => reserva.id == suministroId);
        

        let cantidadAnterior = reserva.cantidad;
        let cantidadNueva = cantidad;
        let diferencia = cantidadNueva - cantidadAnterior;
        console.log("Precio total: " + precioTotal)

      

        if (diferencia > 0) {
            precioTotal += suministro.precio * diferencia;
            if (precioTotal > my_nave.creditos) {
                return res.status(400).json({ error: 'No hay suficientes créditos para realizar la operación' });
            }
         
            // Intentar agregar más unidades a la reserva
            try {
                inventario.agregarReserva(suministroId, diferencia);
                reserva.cantidad += diferencia;
            } catch (error) {
                return res.status(400).json({ error: error.message });
            }
        } else if (diferencia < 0) {
            // Reducir la cantidad de la reserva
            suministro.reserva += diferencia; // diferencia es negativa, así que esto reduce la reserva
            reserva.cantidad += diferencia; // actualizar la cantidad de la reserva en la nave
        }

        console.log('Reserva actualizada:', reserva);
        res.status(200).json({ message: 'Cantidad de suministro actualizada correctamente', reserva });
    } catch (error) {
        console.error('Error al actualizar la cantidad de suministro en la carga:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
      
}





module.exports = {inventarioList, reservarSuministro,ListadoCarga, eliminarSuministroDeCarga,actualizarUnidadesDeCarga};