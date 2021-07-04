var assert = require("assert");
const Avion = require("../src/Avion");
const VueloDePasajeros = require("../src/VueloDePasajeros");
const Estricta = require("../src/Estricta");
const Remate = require("../src/Remate");
const VentaAnticipada = require("../src/VentaAnticipada");

describe("Valores del pasaje según la política", () => {
  describe("Politica standar", () => {
    it("El precio es el mismo que se declaró como precio estandar", () => {
      const vueloDePasajeros = new VueloDePasajeros(
        "23-03",
        new Avion(200, 8, 1000),
        "Buenos Aires",
        "Brasil",
        600,
        new Estricta()
      );

      assert.equal(600, vueloDePasajeros.precioDelVuelo());
    });
  });
  describe("Politica Remate", () => {
    it("Si el vuelo tiene más de 30 asientos libres entonces corresponde el 25% del precio estándar", () => {
      const vueloDePasajeros = new VueloDePasajeros(
        "23-03",
        new Avion(200, 8, 1000),
        "Buenos Aires",
        "Brasil",
        600, // 150 sería el 25% del precio
        new Remate()
      );

      assert.equal(150, vueloDePasajeros.precioDelVuelo());
    });
    it("Si el vuelo tiene menos de 30 asientos libres entonces corresponde el 50% del precio estandar", () => {
      const vueloDePasajeros = new VueloDePasajeros(
        "23-03",
        new Avion(20, 8, 1000),
        "Buenos Aires",
        "Brasil",
        600, // 300 sería el 50% del precio
        new Remate()
      );

      assert.equal(300, vueloDePasajeros.precioDelVuelo());
    });
  });

  describe("Politica Venta Anticipada", () => {
    let vueloDePasajeros;

    beforeEach(() => {
      vueloDePasajeros = new VueloDePasajeros(
        "23-03",
        new Avion(100, 8, 1000),
        "Buenos Aires",
        "Brasil",
        600,
        new VentaAnticipada()
      );
      // vueloDePasajeros.pasajesVendidos = [];
    });

    it("Si el vuelo tiene menos de 40 pasajes vendidos, 30% del precio estándar", () => {
      for (i = 0; i < 30; i++) {
        vueloDePasajeros.venderPasaje("22-03-2021", 26581333);
      }

      assert.equal(180, vueloDePasajeros.precioDelVuelo()); // 180 es el 60% de 600
    });
    it("Si el vuelo tiene entre 40 y 79 pasajes vendidos, 60%, del precio estándar", () => {
      for (i = 0; i < 60; i++) {
        vueloDePasajeros.venderPasaje("22-03-2021", 26581333);
      }

      assert.equal(360, vueloDePasajeros.precioDelVuelo()); // 360 es el 60% de 600
    });
    it("Caso contrario (más de 79), corresponde el precio estándar completo", () => {
      for (i = 0; i < 80; i++) {
        vueloDePasajeros.venderPasaje("22-03-2021", 26581333);
      }

      assert.equal(600, vueloDePasajeros.precioDelVuelo());
    });
  });
});
