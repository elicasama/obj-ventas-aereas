const Vuelo = require("./Vuelo");
const configuracion = require("./Configuracion");

module.exports = class VueloDePasajeros extends Vuelo {
  constructor(fecha, avion, origen, destino, precioEstandar, politica) {
    super(fecha, avion, origen, destino, precioEstandar, politica);
  }

  cantidadAsientosLibres() {
    return this.avion.cantidadDeAsientos - this.cantidadAsientosVendidos();
  }

  pesoDeLaCarga() {
    return (
      configuracion.pesoDeEquipajePorPasajero * this.cantidadAsientosVendidos()
    );
  }
};
