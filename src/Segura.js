//Segura: se pueden vender pasajes sobre los vuelos que tengan, al menos, 3 asientos libres.
module.exports = class Segura {
  puedoVenderUnPasaje(vuelo) {
    return vuelo.cantidadAsientosLibres() > 3;
  }
};
