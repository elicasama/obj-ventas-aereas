const Vuelo = require("./Vuelo");

module.exports = class Pasaje {
  constructor(fechaDeVenta, pasajero, importeAbonado) {
    this.fechaDeVenta = fechaDeVenta;
    this.pasajero = pasajero;
    this.importeAbonado = importeAbonado;
  }
};
