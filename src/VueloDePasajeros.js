const Vuelo = require("./Vuelo");

module.exports = class VueloDePasajeros extends Vuelo {
  constructor(fecha, avion, origen, destino, precioEstandar,politica, criterio) {
    super(fecha, avion, origen, destino, precioEstandar,politica, criterio);
  }

  cantidadAsientosLibres() {
    return this.avion.cantidadDeAsientos;
  }
};
