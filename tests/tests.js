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
        new Avion(230, 2, 1000),
        "Buenos Aires",
        "Brasil",
        600
      );

      assert.equal(10, vueloDeCarga.cantidadAsientosLibres());
    });
    it("Vuelo Charter, es la cantidad disponible del avion - 25", () => {
      const vueloCharter = new VueloCharter(
        "23-03",
        new Avion(230, 2, 1000),
        "Buenos Aires",
        "Brasil",
        600
      );

      assert.equal(205, vueloCharter.cantidadAsientosLibres());
    });
    it("Vuelo de Pasajeros, es la cantidad disponible del avion", () => {
      const vueloDePasajeros = new VueloDePasajeros(
        "23-03",
        new Avion(230, 2, 1000),
        "Buenos Aires",
        "Brasil",
        600
      );

      assert.equal(230, vueloDePasajeros.cantidadAsientosLibres());
    });
  });

  describe("Es Relajado? (sin venta de pasajes) (cabina > 4 metros && menos de 100 asientos disponibles para pasajeros", () => {
    describe("Vuelo de carga (tiene 10 asientos libres de origen depende de la cabina)", () => {
      it("Sí: si la cabina es grande", () => {
        const vueloDeCarga = new VueloDeCarga(
          "23-03",
          new Avion(200, 5, 2000),
          "Buenos Aires",
          "Brasil",
          600
        );

        assert.equal(true, vueloDeCarga.esRelajado());
      });
      it("No: si la cabina es chica", () => {
        const vueloDeCarga = new VueloDeCarga(
          "23-03",
          new Avion(200, 2, 2000),
          "Buenos Aires",
          "Brasil",
          600
        );

        assert.equal(false, vueloDeCarga.esRelajado());
      });
    });
    describe("Vuelo Charter (Cantidad de asientos del avion - 25 es la cantidad libre inicial)", () => {
      it("No: con más de 100 asientos libres", () => {
        const vueloCharter = new VueloCharter(
          "23-03",
          new Avion(230, 13, 1000), //--> asientos disponibles 205
          "Buenos Aires",
          "Brasil",
          600
        );

        assert.equal(false, vueloCharter.esRelajado());
      });
      it("No: con una cabina chica", () => {
        const vueloCharter = new VueloCharter(
          "23-03",
          new Avion(230, 2, 1000), //--> asientos disponibles 205
          "Buenos Aires",
          "Brasil",
          600
        );

        assert.equal(false, vueloCharter.esRelajado());
      });
      it("Sí: con menos de 100 asientos libres", () => {
        const vueloCharter = new VueloCharter(
          "23-03",
          new Avion(30, 13, 1000), //--> asientos disponibles 5
          "Buenos Aires",
          "Brasil",
          600
        );

        assert.equal(true, vueloCharter.esRelajado());
      });
    });
    describe("Vuelo de Pasajeros (Cantidad de asientos del avion)", () => {
      it("No: si tiene muchos asientos, aunque la cabina sea grande", () => {
        const vueloDePasajeros = new VueloDePasajeros(
          "23-03",
          new Avion(200, 8, 1000),
          "Buenos Aires",
          "Brasil",
          600
        );

        assert.equal(false, vueloDePasajeros.esRelajado());
      });
      it("No: si la cabina es chica aunque tenga pocos asientos", () => {
        const vueloDePasajeros = new VueloDePasajeros(
          "23-03",
          new Avion(90, 3, 1000),
          "Buenos Aires",
          "Brasil",
          600
        );

        assert.equal(false, vueloDePasajeros.esRelajado());
      });
      it("Sí: cuando cumple las condiciones", () => {
        const vueloDePasajeros = new VueloDePasajeros(
          "23-03",
          new Avion(90, 5, 1000),
          "Buenos Aires",
          "Brasil",
          600
        );

        assert.equal(true, vueloDePasajeros.esRelajado());
      });
    });
  });
});
