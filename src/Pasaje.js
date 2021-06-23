const Vuelo = require("./Vuelo");

module.exports = class Pasaje extends Vuelo {
  constructor(fechaDeVenta, dni, importeAbonado) {
    super();
    this.fechaDeVenta = fechaDeVenta;
    this.dni = dni;
    this.importeAbonado = importeAbonado;
  }
};
