

class Suministro {
  // Propiedades
  id;
  nombre;
  precio;
  stock;
  reserva;
  // Métodos
  
  constructor(id,nombre,precio,stock) {
    this.id = id;
    this.nombre = nombre
    this.precio = precio
    this.stock = stock   
    this.reserva = 0
  }

  reservar(cantidad_a_reservar) {
    console.log('Intentando reservar:', cantidad_a_reservar, 'para el suministro:', this.nombre, 'con stock actual:', this.stock, 'y reserva actual:', this.reserva);
    if(cantidad_a_reservar + this.reserva <= this.stock){
      this.reserva  = cantidad_a_reservar + this.reserva
    }else{
      throw new Error('No hay suficiente stock disponible para reservar la cantidad solicitada.');
    }
  }

  getStockDisponible() {
    return this.stock - this.reserva;
  }


  restarreservaastock(){
    this.stock = this.stock - this.reserva 
  }
}


module.exports = Suministro