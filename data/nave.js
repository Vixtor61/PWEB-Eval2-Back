
const Reserva =  require('./reserva');
class Nave {
  // Propiedades
  nombre;
  creditos;
  carga = [];
  reservas = [];
  // Métodos
  
  constructor(nombre, creditos) {
    this.nombre = nombre;
    this.creditos = creditos;
    this.carga = [];
    this.reservas = [];
  }

  agregarReserva(suministro, cantidad) {
    console.log('Agregando reserva a la nave:', suministro.nombre, 'Cantidad:', cantidad);
    let reserva = this.reservas.find(reserva => reserva.id === suministro.id);
    console.log('Reserva ya realizada con id encontrada:', reserva);
    if (reserva) {
      reserva.cantidad += cantidad;
    } else {
      reserva = new Reserva(suministro.id, cantidad);
      this.reservas.push(reserva);
    }
 
  }
 

}
module.exports = Nave