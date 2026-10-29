
//const helper = require('../utils/helpers');

const Inventario = require('../data/inventario');
const Reserva = require('../data/reserva');
const inventario = new Inventario();
const Nave = require('../data/nave');
const my_nave = new Nave("Nave1", 1000);
const registrarIncidencia = (req, res) => {
    try {
       
        if ( req.body === undefined) {
            return res.status(400).json({ error: 'peticion inválida' });
        }
        let id = helper.getID();
       
        const { empleado, area,descripcion, prioridad } = req.body;
        const nuevaIncidencia = { id , empleado, area, descripcion, prioridad };

        const validacion = helper.ValidarNuevaIncidencia(nuevaIncidencia);
        if (!validacion.valido) {
            return res.status(400).json({ error: validacion.mensaje });
        }
        //Asignar ID y guardar la incidencia
 
        nuevaIncidencia.estado = 'Pendiente'; // Estado inicial
        //Limpiar campos de errores communes
        nuevaIncidencia.empleado = empleado.trim();
        nuevaIncidencia.area = area.trim();
        incidencias.push(nuevaIncidencia);
        res.status(201).json({ message: 'Incidencia registrada correctamente' });
        }

    catch (error) {
        console.error('Error al registrar la incidencia:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }



}

const listarIncidencias = (req, res) => {
    try {
        res.status(200).json(incidencias);
      
    }

    catch (error) {
        
        res.status(500).json({ error: 'Error interno del servidor' });
    }
    
}

const busquedaIncidenciaID = (req, res) => {
    let id = req.params.id
    const validacionID = helper.ValidarIDBusqueda(id);
    if (!validacionID.valido) {
        return res.status(400).json({ error: validacionID.mensaje });
    }
    id = Number(id);
    let incidencia = incidencias.find(incidencia => incidencia.id === id);
    if (!incidencia) {
        return res.status(404).json({ error: 'Incidencia no encontrada' });
    }
    res.status(200).json(incidencia);
}

const inventarioList = (req, res) => {
   let invent = { suministros: inventario.getInventario(),
                suministro: inventario.findSuministroById(1)
    };

    res.status(200).json(invent);
 
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




module.exports = {inventarioList, reservarSuministro,ListadoCarga, eliminarSuministroDeCarga};