// Venta anticipada:
// Si el vuelo tiene menos de 40 pasajes vendidos, 30% del precio estándar.
// Si el vuelo tiene entre 40 y 79 pasajes vendidos, 60%, del precio estándar.
// Caso contrario, corresponde el precio estándar completo.

module.exports = class VentaAnticipada {
  calcularPrecio(vuelo) {
    if (vuelo.pasajesVendidos < 40) return vuelo.precioEstandar * 0.3;
    return 40 <= vuelo.pasajesVendidos && vuelo.pasajesVendidos <= 79
      ? vuelo.precioEstandar * 0.6
      : vuelo.precioEstandar;
  }
};
