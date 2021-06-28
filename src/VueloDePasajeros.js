const Vuelo = require("./Vuelo");

module.exports = class VueloDePasajeros extends Vuelo {
  constructor(fecha, avion, origen, destino, precioEstandar, politica) {
    super(fecha, avion, origen, destino, precioEstandar, politica);
  }

  cantidadAsientosLibres() {
    return this.avion.cantidadDeAsientos - this.cantidadAsientosVendidos();
  }
};
