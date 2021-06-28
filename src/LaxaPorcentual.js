//Laxa porcentual: se permite vender en cada vuelo hasta un 10% más de los asientos disponibles.
module.exports = class LaxaPorcentual {
    puedoVenderUnPasaje(vuelo) {
      //return  (vuelo.cantidadAsientosLibres() * 1.1 ) > vuelo.cantidadAsientosVendidos()
      return  (vuelo.cantidadAsientosLibres() * 1.1 ) > vuelo.pasajesVendidos.length;
    }

  };
  