const Vuelo = require("./Vuelo");

module.exports = class VueloCharter extends Vuelo {
  constructor(fecha, avion, origen, destino, precioEstandar, politica) {
    super(fecha, avion, origen, destino, precioEstandar, politica);
  }

  cantidadAsientosDisponibles() {
    return this.avion.cantidadDeAsientos - 25;
  }

  pesoDeLaCarga() {
    return 5000;
  }
};
