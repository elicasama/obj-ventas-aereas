module.exports = class Vuelo {
  constructor(fechaDeVuelo, avion, origen, destino, precioEstandar) {
    this.fechaDeVuelo = fechaDeVuelo;
    this.avion = avion;
    this.origen = origen;
    this.destino = destino;
    this.precioEstandar = precioEstandar;
  }
};
