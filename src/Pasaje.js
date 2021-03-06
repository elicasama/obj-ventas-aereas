const Vuelo = require("./Vuelo");

module.exports = class Pasaje {
  constructor(fechaDeVenta, pasajero, importeAbonado) {
    this.fechaDeVenta = fechaDeVenta;
    this.pasajero = pasajero;
    this.importeAbonado = importeAbonado;
    this.pagoRealizado = 0;
  }

  registrarPago(importe) {
    this.pagoRealizado += importe;
  }

  saldoAPagar() {
    return this.importeAbonado - this.pagoRealizado;
  }
};
