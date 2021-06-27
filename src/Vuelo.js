module.exports = class Vuelo {
  constructor(
    fecha,
    avion,
    origen,
    destino,
    precioEstandar,
    politica,
    criterio
  ) {
    this.fecha = fecha;
    this.avion = avion;
    this.origen = origen;
    this.destino = destino;
    this.precioEstandar = precioEstandar;
    this.politica = politica;
    this.criterio = criterio;
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
    return this.criterio.analizarPosibleVenta(this);
  }
};
