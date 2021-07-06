var _ = require("lodash");
const Segura = require("./Segura");

class Agencia {
  constructor() {
    this.vuelos = [];
    this.pesoDeEquipajePorPasajero = 20;
    this.criterio = new Segura();
    this.ciudadesOrigenConCriterio = []; // ej: {nombre: "Buenos Aires" criterio: new Segura()}
  }

  agregarVuelo(vuelo) {
    this.vuelos.push(vuelo);
  }

  cantidadDeVueltos() {
    return this.vuelos.length;
  }

  vuelosDeUnPasajero(pasajero) {
    return this.vuelos.filter((vuelo) => vuelo.tienePasaje(pasajero));
  }

  sonCompañeros(pasajero1, pasajero2) {
    return (
      this.vuelosDeUnPasajero(pasajero1).filter((vuelo) =>
        this.vuelosDeUnPasajero(pasajero2).includes(vuelo)
      ).length >= 3
    );
  }

  fechasDeViaje(pasajero, destino) {
    return this.vuelosDeUnPasajero(pasajero)
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

  cantidaDePasajes(pasajero) {
    return _.countBy(this.vuelos, (vuelo) => vuelo.tienePasaje(pasajero)).true;
  }

  agregarciudadeOrigenConCriterio(ciudad, criterio) {
    ciudad.criterio = criterio;
    this.ciudadesOrigenConCriterio.push(ciudad);
  }

  criterioDelaCiudadOrigen(ciudadOrigen) {
    return (
      this.ciudadesOrigenConCriterio.find(
        (ciudad) => ciudad.nombre == ciudadOrigen
      )?.criterio || this.criterio
    );
  }

  vuelosIntercontinentalesParaUnDía(fecha) {
    return this._vuelosParaUnaFecha(fecha).filter((vuelo) =>
      vuelo.esInercontinental()
    );
  }

  totalDeComprasDelPasajero(pasajero) {
    return _.sumBy(this.pasajesDe(pasajero), (pasaje) => pasaje.importeAbonado);
  }

  pasajesDe(pasajero) {
    return this.vuelosDeUnPasajero(pasajero).map((vuelo) =>
      vuelo.pasajeDe(pasajero)
    );
  }

  _vuelosParaUnaFecha(fecha) {
    return this.vuelos.filter((vuelo) => vuelo.fecha == fecha);
  }
}

module.exports = new Agencia();
