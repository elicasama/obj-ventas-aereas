var assert = require("assert");
const Configuracion = require("../src/Configuracion");
const Avion = require("../src/Avion");
const VueloDePasajeros = require("../src/VueloDePasajeros");
const VueloCharter = require("../src/VueloCharter");
const Segura = require("../src/Segura");
const Estricta = require("../src/Estricta");
const Agencia = require("../src/Agencia");
const Pasajero = require("../src/Pasajero");

describe("Mirando a los Pasajeros", () => {
  let vueloDePasajeros,
    vueloDePasajeros2,
    vueloCharter,
    agencia,
    pasajero1,
    pasajero2;

  beforeEach(() => {
    Configuracion.criterio = new Segura();

    vueloDePasajeros = new VueloDePasajeros(
      "2021-03-23",
      new Avion(100, 8, 1000),
      "Buenos Aires",
      "Brasil",
      600,
      new Estricta()
    );

    vueloDePasajeros2 = new VueloDePasajeros(
      "2022-11-07",
      new Avion(100, 8, 1000),
      "Buenos Aires",
      "Tahiti",
      600,
      new Estricta()
    );
    vueloDePasajeros3 = new VueloDePasajeros(
      "2022-11-07",
      new Avion(100, 8, 1000),
      "China",
      "Japón",
      600,
      new Estricta()
    );

    vueloCharter = new VueloCharter(
      "2021-06-11",
      new Avion(300, 6, 3000),
      "Salta",
      "Tahiti",
      600,
      new Estricta()
    );

    agencia = new Agencia();

    agencia.agregarVuelo(vueloDePasajeros);
    agencia.agregarVuelo(vueloDePasajeros2);
    agencia.agregarVuelo(vueloDePasajeros3);
    agencia.agregarVuelo(vueloCharter);

    pasajero1 = new Pasajero(11111111);
    pasajero2 = new Pasajero(22222222);

    vueloDePasajeros.venderPasaje("2021-05-11", pasajero1);
    vueloDePasajeros.venderPasaje("2021-06-10", pasajero2);

    vueloDePasajeros2.venderPasaje("2021-05-10", pasajero1);
    vueloDePasajeros2.venderPasaje("2021-06-03", pasajero2);
  });

  describe("Pasajes comprados", () => {
    it("Cantidad de pasajes comprados en la agencia", () => {
      // ya vienen compartiendo dos vuelos

      vueloDePasajeros3.venderPasaje("2020-05-11", pasajero1);

      assert.equal(3, agencia.cantidaDePasajes(pasajero1));
    });
  });

  describe("Son compañeros?", () => {
    it("Son compañeros si comparten 3 o más vuelos", () => {
      // ya vienen compartiendo dos vuelos
      vueloDePasajeros3.venderPasaje("2020-05-11", pasajero1);
      vueloDePasajeros3.venderPasaje("2020-06-10", pasajero2);

      vueloCharter.venderPasaje("2021-06-10", pasajero2);

      assert.equal(true, agencia.sonCompañeros(pasajero1, pasajero2));
    });

    it("No son compañeros si no comparten al menos 3 vuelos", () => {
      // solo comparten dos vuelos

      assert.equal(false, agencia.sonCompañeros(pasajero1, pasajero2));
    });
  });
});
