module.exports = class Vuelo {
  constructor(fecha, avion, origen, destino, precioEstandar) {
    this.fecha = fecha;
    this.avion = avion;
    this.origen = origen;
    this.destino = destino;
    this.precioEstandar = precioEstandar;
  }

  venderPasaje() {
    return this.avion.cantidadDeAsientos - 1
  }
};
