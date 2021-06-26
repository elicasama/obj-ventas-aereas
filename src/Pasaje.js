const Vuelo = require("./Vuelo");

module.exports = class Pasaje {
  constructor(fechaDeVenta, dni, importeAbonado) {
    this.fechaDeVenta = fechaDeVenta;
    this.dni = dni;
    this.importeAbonado = importeAbonado;
  }
};
