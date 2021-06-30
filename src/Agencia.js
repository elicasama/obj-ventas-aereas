var _ = require("lodash");

module.exports = class Agencia {
  constructor() {
    this.vuelos = [];
  }

  agregarVuelo(vuelo) {
    this.vuelos.push(vuelo);
  }

  cantidadDeVueltos() {
    return this.vuelos.length;
  }

  vuelosDeUnPasajero(dni) {
    return this.vuelos.filter((vuelo) => vuelo.tienePasaje(dni));
  }

  fechasDeViaje(dni, destino) {
    return this.vuelosDeUnPasajero(dni)
      .filter((vuelo) => vuelo.destino == destino)
      .map((vuelo) => vuelo.fecha);
  }

  vuelosEntreFechas(fecha1, fecha2) {
    return this.vuelos.filter(
      (vuelo) => fecha1 <= vuelo.fecha && vuelo.fecha <= fecha2
    );
  }

  vuelosPorDestino(destino) {
    return this.vuelos.filter((vuelo) => vuelo.destino == destino);
  }

  vuelosParaDestinoEntreFechas(destino, fecha1, fecha2) {
    return this.vuelosEntreFechas(fecha1, fecha2).filter(
      (vuelo) => vuelo.destino == destino
    );
  }

  asientosLibresEntreVuelos(destino, fecha1, fecha2) {
    return _.sumBy(
      this.vuelosParaDestinoEntreFechas(destino, fecha1, fecha2),
      (vuelo) => vuelo.cantidadAsientosLibres()
    );
  }
};
