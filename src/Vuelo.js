const configuracion = require("./Configuracion");

module.exports = class Vuelo {
  constructor(fecha, avion, origen, destino, precioEstandar, politica) {
    this.fecha = fecha;
    this.avion = avion;
    this.origen = origen;
    this.destino = destino;
    this.precioEstandar = precioEstandar;
    this.politica = politica;
    this.pasajesVendidos = 0;
  }

  esRelajado() {
    return this.avion.alturaCabina > 4 && this.cantidadAsientosLibres() < 100;
  }

  precioDelVuelo() {
    return this.politica.calcularPrecio(this);
  }

  venderPasaje() {
    return (this.pasajesVendidos = this.pasajesVendidos + 1);
  }

  sePuedeVenderUnPasaje() {
    return configuracion.criterio.puedoVenderUnPasaje(this);
  }
};
