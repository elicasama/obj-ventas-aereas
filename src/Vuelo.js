var _ = require("lodash");
const configuracion = require("./Configuracion");
const errores = require("./errores");
const Pasaje = require("../src/Pasaje");

module.exports = class Vuelo {
  constructor(fecha, avion, origen, destino, precioEstandar, politica) {
    this.fecha = fecha;
    this.avion = avion;
    this.origen = origen;
    this.destino = destino;
    this.precioEstandar = precioEstandar;
    this.politica = politica;
    this.pasajesVendidos = [];
  }

  esRelajado() {
    return this.avion.alturaCabina > 4 && this.cantidadAsientosLibres() < 100;
  }

  cantidadAsientosVendidos() {
    return this.pasajesVendidos.length;
  }

  cantidadAsientosLibres() {
    return this.cantidadAsientosDisponibles() - this.cantidadAsientosVendidos();
  }

  precioDelVuelo() {
    return this.politica.calcularPrecio(this);
  }

  pesoTotalDelVuelo() {
    return this.avion.peso + this.pesoDeLosPasajeros() + this.pesoDeLaCarga();
  }

  pesoDeLosPasajeros() {
    return configuracion.pesoStandarIATA * this.cantidadAsientosVendidos();
  }

  venderPasaje(fecha, pasajero) {
    if (!this.sePuedeVenderUnPasaje())
      throw new errores.NoSePuedeVenderElPasaje();
    this.pasajesVendidos.push(
      new Pasaje(fecha, pasajero, this.precioDelVuelo())
    );
  }

  sePuedeVenderUnPasaje() {
    return configuracion.criterio.puedoVenderUnPasaje(this);
  }

  importeVendido() {
    return _.sumBy(this.pasajesVendidos, (pasaje) => pasaje.importeAbonado);
  }

  tienePasaje(pasajero) {
    return this.pasajesVendidos.some(
      (pasaje) => pasaje.pasajero.dni == pasajero.dni
    );
  }
};
