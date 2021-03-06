var _ = require("lodash");
const errores = require("./errores");
const Pasaje = require("../src/Pasaje");
const iata = require("../src/iata");
const agencia = require("../src/Agencia");

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
    return iata.pesoEstandar * this.cantidadAsientosVendidos();
  }

  venderPasaje(fecha, pasajero) {
    if (!this.sePuedeVenderUnPasaje())
      throw new errores.NoSePuedeVenderElPasaje();
    this.pasajesVendidos.push(
      new Pasaje(fecha, pasajero, this.precioDelVuelo())
    );
  }

  sePuedeVenderUnPasaje() {
    return agencia
      .criterioDelaCiudadOrigen(this.origen)
      .puedoVenderUnPasaje(this);
  }

  importeVendido() {
    return _.sumBy(this.pasajesVendidos, (pasaje) => pasaje.importeAbonado);
  }
  
  importeCobrado() {
    return _.sumBy(this.pasajesVendidos, (pasaje) => pasaje.pagoRealizado);
  }

  tienePasaje(pasajero) {
    return this.pasajesVendidos.some(
      (pasaje) => pasaje.pasajero.dni === pasajero.dni
    );
  }

  pasajeDe(pasajero) {
    return this.pasajesVendidos.find(
      (pasaje) => pasaje.pasajero.dni === pasajero.dni
    );
  }

  importeDeUnPasajeVendido(pasajero) {
    return this.pasajeDe(pasajero).importeAbonado;
  }

  pagarUnPasaje(pasajero, importe) {
    return this.pasajeDe(pasajero).registrarPago(importe);
  }

  esIntercontinental() {
    return this.origen.continente !== this.destino.continente;
  }
};
