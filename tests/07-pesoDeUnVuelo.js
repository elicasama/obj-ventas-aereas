var assert = require("assert");
const Avion = require("../src/Avion");
const VueloDePasajeros = require("../src/VueloDePasajeros");
const Configuracion = require("../src/Configuracion");
const Segura = require("../src/Segura");
const Estricta = require("../src/Estricta");
const VueloDeCarga = require("../src/VueloDeCarga");
const VueloCharter = require("../src/VueloCharter");

describe("Peso del Vuelo", () => {
  beforeEach(() => {
    Configuracion.criterio = new Segura();
  });

  describe("De Pasajeros ", () => {
    it("Viajando 2 pasajeros", () => {
      vueloDePasajeros = new VueloDePasajeros(
        "23-03",
        new Avion(100, 8, 1000),
        "Buenos Aires",
        "Brasil",
        600,
        new Estricta()
      );
      vueloDePasajeros.pasajesVendidos = [];

      for (i = 0; i < 2; i++) {
        vueloDePasajeros.venderPasaje("22-03-2021", 26581333);
      }
      // peso del avión                       = 1000
      // peso de los pasajeros (2 * 70)       = 140
      // peso del equipaje permitido (2 * 20) = 40

      assert.equal(1180, vueloDePasajeros.pesoTotalDelVuelo());
    });
  });

  describe("De carga ", () => {
    it("Viajando 2 pasajeros", () => {
      const vueloDeCarga = new VueloDeCarga(
        "23-03",
        new Avion(100, 8, 3000),
        "Buenos Aires",
        "Brasil",
        600,
        new Estricta(),
        1000 // peso de la carga
      );
      vueloDeCarga.pasajesVendidos = [];

      for (i = 0; i < 2; i++) {
        vueloDeCarga.venderPasaje("22-03-2021", 26581333);
      }
      // peso del avión                       = 3000
      // peso de los pasajeros (2 * 70)       = 140
      // peso de la carga                     = 1000
      // peso de equipamiento fijo            = 700

      assert.equal(4840, vueloDeCarga.pesoTotalDelVuelo());
    });
  });

  describe("Charter ", () => {
    it("Viajando 3 pasajeros", () => {
      const vueloCharter = new VueloCharter(
        "23-03",
        new Avion(100, 8, 10000),
        "Buenos Aires",
        "Brasil",
        600,
        new Estricta()
      );
      vueloCharter.pasajesVendidos = [];

      for (i = 0; i < 3; i++) {
        vueloCharter.venderPasaje("22-03-2021", 26581333);
      }
      // peso del avión                       = 10000
      // peso de los pasajeros (2 * 70)       =   210
      // peso fijo                            =  5000

      assert.equal(15210, vueloCharter.pesoTotalDelVuelo());
    });
  });
});
