

class Suministro {
  // Propiedades
  id;
  nombre;
  precio;
  stock;
  reserva;
  categoria;
  // Métodos
  
  constructor(id,nombre,precio,stock,categoria) {
    this.id = id;
    this.nombre = nombre
    this.precio = precio
    this.stock = stock   
    this.categoria = categoria
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

  get stockDisponible() {
    return this.stock - this.reserva;
  }


  restarreservaastock(){
    this.stock = this.stock - this.reserva 
  }
  toJSON(){
    return {
      id: this.id,
      nombre: this.nombre,
      precio: this.precio,
      stock: this.stock,
      reserva: this.reserva,
      categoria: this.categoria,
      stockDisponible: this.stockDisponible
    };
  }
}


module.exports = Suministro