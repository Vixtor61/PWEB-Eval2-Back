const Suministro =  require('./suministro');

class Inventario {
  // Propiedades
  inventario =  []
  // Métodos
  
  constructor() {
    this.inventario = []
    this.crear_suministros_iniciales()
  }

  crear_suministros_iniciales(){
      //id, nombre, precio, stock
      this.inventario.push(new Suministro(1, "Silla",50,5));
      this.inventario.push(new Suministro(2, "Mesa",100,3));
      this.inventario.push(new Suministro(3, "Computadora",500,2));
      this.inventario.push(new Suministro(4, "Proyector",300,1));
      this.inventario.push(new Suministro(5, "Pizarra",150,4));
  }
  getInventario() {
    return this.inventario;
  }

  findSuministroById(id) {
    //console.log('Buscando suministro con ID:', id);
    //console.log('Inventario actual:', this.inventario);
    console.log( this.inventario.find(suministro => suministro.id == id))
    return this.inventario.find(suministro => suministro.id == id);
  }

  agregarSuministro(suministro) {
    this.inventario.push(suministro);
  }

  agregarReserva(suministroId, cantidad) {
    const suministro = this.findSuministroById(suministroId);
    if (suministro) {
      try {
        suministro.reservar(cantidad);
        return true; // Reserva exitosa
      } catch (error) {
        throw new Error('Stock en base insuficiente"');
        
      }
  
    }
  }
}


module.exports = Inventario