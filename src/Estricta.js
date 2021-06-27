//Estricta: todos los asientos se venden al precio estándar.
module.exports = class Estricta {
  calcularPrecio(vuelo) {
    return vuelo.precioEstandar;
  }
};
