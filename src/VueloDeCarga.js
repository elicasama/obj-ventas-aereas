const Vuelo = require("./Vuelo");

module.exports = class VueloDeCarga extends Vuelo {
  cantidadAsientosLibres() {
    return 10;
  }
};
