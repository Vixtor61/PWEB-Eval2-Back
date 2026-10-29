const incidencias = require('../data/incidencias');
let id = 0




const ValidarNuevaIncidencia = (incidencia) => {
    console.log(incidencia)
    let resultado = {valido: false, mensaje: ''};
    const {  empleado, area,descripcion, prioridad } = incidencia;
    if ( !empleado || !area || !descripcion || !prioridad) {
        
        
        return resultado = {valido: false, mensaje: 'Los campos deben ser cadenas no vacías'};
        
    }
    if ( !cadenaValida(empleado) || !cadenaValida(area) || !cadenaValida(descripcion) || !cadenaValida(prioridad)) {
        return resultado = {valido: false, mensaje: 'Los campos deben ser cadenas no vacías'};
    }
   
    if(prioridad === prioridad.toLowerCase()){
        return resultado = {valido: false, mensaje: 'Prioridad inválida. Debe empezar con mayúscula. ejemplo: \'Alta\', \'Media\' o \'Baja\''};
    }
    console.log('probar prioridad');
    switch (prioridad) {
        case 'Alta':
        case 'Media':
        case 'Baja':
            break;
        default:
            return resultado = {valido: false, mensaje: 'Prioridad inválida. Debe ser \'Alta\', \'Media\' o \'Baja\''};
    }
    console.log('Incidencia válida');
    return resultado = {valido: true, mensaje: 'Incidencia válida'};
    
}

const ValidarIDBusqueda = (id) => {
    console.log('Validando ID de búsqueda:', id);
    id = Number(id);
    console.log('ID convertido a número:', id);
    let resultado = {valido: false, mensaje: ''};
    if (id === undefined || isNaN(id)  || id <= 0) {
        return resultado = {valido: false, mensaje: 'ID inválido'};
    }
    return resultado = {valido: true, mensaje: 'ID válido'};
    
}

const cadenaValida = (cadena) => {
    if (typeof cadena === 'string' && cadena.trim().length > 0) {
        return true;
    }
    return false;
}

const ValidarEstado = (estado) => {
    
    let resultado = {valido: false, mensaje: ''};
    
    if ( !estado || !cadenaValida(estado)) {
            
        return resultado = {valido: false, mensaje: 'El campo de estado debe ser una cadena no vacía'};
        
    }

    if(estado === estado.toLowerCase()){
        return resultado = {valido: false, mensaje: 'Estado inválido. Debe empezar con mayúscula. ejemplo: \'Pendiente\', \'En Progreso\', \'Resuelta\' o \'Cancelada\''};
    }
    
    switch (estado) {
        case 'Pendiente':
        case 'En Progreso':
        case 'Resuelta':
        case 'Cancelada':
            break;
        default:
            return resultado = {valido: false, mensaje: 'Estado inválido. Debe ser \'Pendiente\', \'En Progreso\', \'Resuelta\' o \'Cancelada\''};
    }
    console.log('estado valido');
    return resultado = {valido: true, mensaje: 'Estado valido'};
    
}

const obtenerClasficiacion = (prioridad) => {
     
    switch (prioridad) {
        case 'Alta':
            return 'Critica';
        case 'Media':
            return 'Importante';
        case 'Baja':
            return 'Normal';
        default:
            return "";
    }

}

const getID = () => {
   
    return ++id;

}





module.exports = { getID,ValidarNuevaIncidencia , ValidarIDBusqueda, ValidarEstado, obtenerClasficiacion};
