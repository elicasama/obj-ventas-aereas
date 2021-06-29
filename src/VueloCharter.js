const Vuelo = require("./Vuelo");

module.exports = class VueloCharter extends Vuelo {
  constructor(fecha, avion, origen, destino, precioEstandar, politica) {
    super(fecha, avion, origen, destino, precioEstandar, politica);
  }

  cantidadAsientosLibres() {
    return this.avion.cantidadDeAsientos - 25 - this.cantidadAsientosVendidos();
  }

  pesoDeCarga() {
    return 5000;
  }
};
