var _ = require("lodash");
const Segura = require("./Segura");

class Agencia {
  constructor() {
    this.vuelos = [];
    this.pesoDeEquipajePorPasajero= 20
    this.criterio= new Segura()
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

  cantidaDePasajes(dni) {
    return _.countBy(this.vuelos, (vuelo) => vuelo.tienePasaje(dni)).true;
  }
};

module.exports = new Agencia();