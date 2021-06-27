//Remate: si el vuelo tiene más de 30 asientos libres entonces corresponde el 25% del precio estándar, si no el 50%.
module.exports = class Remate {
  calcularPrecio(vuelo) {
    return vuelo.cantidadAsientosLibres() > 30
      ? vuelo.precioEstandar * 0.25
      : vuelo.precioEstandar * 0.5;
  }
};
