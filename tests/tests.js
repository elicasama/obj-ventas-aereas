var assert = require("assert");
const Avion = require("../src/Avion");
//const Pasaje = require("../src/Pasaje")
//const Vuelo = require("../src/Vuelo")
const VueloDePasajeros = require("../src/VueloDePasajeros");
const VueloCharter = require("../src/VueloCharter");
const VueloDeCarga = require("../src/VueloDeCarga");

describe("Agencia de Vuelos", () => {
  describe("Disponibilidades de asientos - antes de vender un pasaje", () => {
    it("Vuelo de carga, siempre tiene 10 asientos disponibles", () => {
      const vueloDeCarga = new VueloDeCarga(
        "23-03",
        new Avion(230, 130, 1000),
        "Buenos Aires",
        "Brasil",
        600
      );

      assert.equal(10, vueloDeCarga.cantidadAsientosLibres());
    });
    it("Vuelo Charter, es la cantidad disponible del avion - 25", () => {
      const vueloCharter = new VueloCharter(
        "23-03",
        new Avion(230, 130, 1000),
        "Buenos Aires",
        "Brasil",
        600
      );

      assert.equal(205, vueloCharter.cantidadAsientosLibres());
    });
    it("Vuelo de Pasajeros, es la cantidad disponible del avion", () => {
      const vueloDePasajeros = new VueloDePasajeros(
        "23-03",
        new Avion(230, 130, 1000),
        "Buenos Aires",
        "Brasil",
        600
      );

      assert.equal(230, vueloDePasajeros.cantidadAsientosLibres());
    });
  });
});

//constructor(fecha, avion, origen, destino, precioEstandar);
