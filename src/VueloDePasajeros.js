const Vuelo = require("./Vuelo");

module.exports = class VueloDePasajeros extends Vuelo {
  constructor(fecha, avion, origen, destino, precioEstandar) {
    super(fecha, avion, origen, destino, precioEstandar);
  }

  cantidadAsientosLibres() {
    return this.avion.cantidadDeAsientos;
  }
}