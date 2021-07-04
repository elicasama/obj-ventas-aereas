const Vuelo = require("./Vuelo");

module.exports = class VueloDeCarga extends Vuelo {
  constructor(fecha, avion, origen, destino, precioEstandar, politica, carga) {
    super(fecha, avion, origen, destino, precioEstandar, politica);
    this.carga = carga;
  }

  cantidadAsientosDisponibles() {
    return 10;
  }

  pesoDeLaCarga() {
    return this.carga + 700;
  }
};
