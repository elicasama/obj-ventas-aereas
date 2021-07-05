const Vuelo = require("./Vuelo");
const agencia = require("../src/Agencia");

module.exports = class VueloDePasajeros extends Vuelo {
  constructor(fecha, avion, origen, destino, precioEstandar, politica) {
    super(fecha, avion, origen, destino, precioEstandar, politica);
  }

  cantidadAsientosDisponibles() {
    return this.avion.cantidadDeAsientos;
  }

  pesoDeLaCarga() {
    return agencia.pesoDeEquipajePorPasajero * this.cantidadAsientosVendidos();
    
  }
};
