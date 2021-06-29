const Vuelo = require("./Vuelo");

module.exports = class VueloDeCarga extends Vuelo {
  constructor(fecha, avion, origen, destino, precioEstandar, politica, carga) {
    super(fecha, avion, origen, destino, precioEstandar, politica);
    this.carga = carga;
  }

  cantidadAsientosLibres() {
    return 10 - this.cantidadAsientosVendidos();
  }

  pesoDeCarga() {
    return this.carga + 700;
  }

};
