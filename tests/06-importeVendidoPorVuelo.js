var assert = require("assert");
const Avion = require("../src/Avion");
const VueloDePasajeros = require("../src/VueloDePasajeros");
const Configuracion = require("../src/Configuracion");
const Segura = require("../src/Segura");
const Estricta = require("../src/Estricta");
const Remate = require("../src/Remate");
const VentaAnticipada = require("../src/VentaAnticipada");

describe("Importe vendido para un vuelo - según politica", () => {
  let vueloDePasajeros;

  beforeEach(() => {
    Configuracion.criterio = new Segura();
    vueloDePasajeros = new VueloDePasajeros(
      "23-03",
      new Avion(100, 8, 1000),
      "Buenos Aires",
      "Brasil",
      600,
      new Estricta()
    );
    vueloDePasajeros.pasajesVendidos = [];
  });

  describe("Estricta ", () => {
    it("Si se venden 2 vuelos de 600 sería 1200", () => {
      for (i = 0; i < 2; i++) {
        vueloDePasajeros.venderPasaje("22-03-2021", 26581333); // 2 pasajes a 600
      }

      assert.equal(1200, vueloDePasajeros.importeVendido());
    });
  });

  describe("Remate", () => {
    let vueloDePasajeros;

    beforeEach(() => {
      vueloDePasajeros = new VueloDePasajeros(
        "23-03",
        new Avion(100, 8, 1000),
        "Buenos Aires",
        "Brasil",
        600,
        new Remate()
      );
      vueloDePasajeros.pasajesVendidos = [];
    });

    it("Si el vuelo tiene más de 30 asientos libres entonces corresponde el 25% del precio estándar", () => {
      for (i = 0; i < 2; i++) {
        vueloDePasajeros.venderPasaje("22-03-2021", 26581333);
      }

      assert.equal(300, vueloDePasajeros.importeVendido());
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

      for (i = 0; i < 2; i++) {
        vueloDePasajeros.venderPasaje("22-03-2021", 26581333); // 2 pasajes a 300
      }

      assert.equal(600, vueloDePasajeros.importeVendido());
    });
  });

  describe("Venta Anticipada", () => {
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
      vueloDePasajeros.pasajesVendidos = [];
    });

    it("Si el vuelo tiene menos de 40 pasajes vendidos, 30% del precio estándar", () => {
      for (i = 0; i < 30; i++) {
        vueloDePasajeros.venderPasaje("22-03-2021", 26581333);
      }

      assert.equal(5400, vueloDePasajeros.importeVendido());
    });

    it("Si el vuelo tiene más de 80 pasajes se suman todos los montos a medida que se vendieron", () => {
      // de 0 a 39 =  180 cada vuelo  =  180 * 40 = 7200  // al 60%
      // de 40 a 79 = 360 cada vuelo = 360 * 40 =  14400  // al 30 %
      // de 80 a 81 = 600 cada vuelo = 600 * 2 = 1200     // al precio standar

      for (i = 0; i < 81; i++) {
        vueloDePasajeros.venderPasaje("22-03-2021", 26581333);
      }
      assert.equal(22200, vueloDePasajeros.importeVendido());
    });
  });
});
