//Laxa fija: se permite vender en cada vuelo hasta 10 pasajes más de los asientos disponibles.
module.exports = class LaxaFija {
  puedoVenderUnPasaje(vuelo) {
    return (
      vuelo.avion.cantidadDeAsientos + 10 - vuelo.cantidadAsientosVendidos() > 0
    );
  }
};
