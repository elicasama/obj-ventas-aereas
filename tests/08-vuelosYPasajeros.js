var assert = require("assert");
const Avion = require("../src/Avion");
const VueloDePasajeros = require("../src/VueloDePasajeros");
const Configuracion = require("../src/Configuracion");
const Segura = require("../src/Segura");
const Estricta = require("../src/Estricta");
const VueloCharter = require("../src/VueloCharter");
const Agencia = require("../src/Agencia");
const Pasajero = require("../src/Pasajero");

describe("Vuelos y Pasajeros", () => {
  let pasajero, pasajero2;

  beforeEach(() => {
    Configuracion.criterio = new Segura();
    vueloDePasajeros2 = new VueloDePasajeros(
      "2022-11-07",
      new Avion(100, 8, 1000),
      "Buenos Aires",
      "Tahiti",
      600,
      new Estricta()
    );

    vueloDePasajeros = new VueloDePasajeros(
      "2021-03-23",
      new Avion(100, 8, 1000),
      "Buenos Aires",
      "Brasil",
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

    pasajero = new Pasajero(11111111);
  });

  describe("Saber si un pasajero está en un vuelo determinado ", () => {
    it("Sí: si le vendieron un pasaje pasajero con dni = 11111111", () => {
      vueloDePasajeros.venderPasaje("10-03-2021", pasajero);

      assert.equal(true, vueloDePasajeros.tienePasaje(pasajero));
    });
    it("No: si no le vendieron un pasaje al pasajero con dni = 11111111", () => {
      pasajero2 = new Pasajero(2222222);
      vueloDePasajeros.venderPasaje("10-03-2021", pasajero2);

      assert.equal(false, vueloDePasajeros.tienePasaje(pasajero));
    });
  });

  describe("La Agencia tiene distintos vuelos", () => {
    it("Agregar un vuelo a la agencia", () => {
      vueloDePasajeros.venderPasaje("10-03-2021", pasajero);

      const agencia = new Agencia();
      agencia.agregarVuelo(vueloDePasajeros);

      assert.equal(1, agencia.cantidadDeVueltos());
    });
  });
  describe("Saber el/los vuelos de un pasajero", () => {
    it("Conocer los vuelos de un pasajero con dni 11111111", () => {
      const agencia = new Agencia();

      vueloDePasajeros.venderPasaje("10-03-2021", pasajero);
      vueloCharter.venderPasaje("10-23-2021", pasajero);

      agencia.agregarVuelo(vueloDePasajeros);
      agencia.agregarVuelo(vueloCharter);

      assert.deepEqual(
        [vueloDePasajeros, vueloCharter],
        agencia.vuelosDeUnPasajero(pasajero)
      );
    });
  });

  describe("Fechas de los vuelos", () => {
    it("Conocer las fechas de vuelos de un pasajero a un destino dado", () => {
      const agencia = new Agencia();

      vueloDePasajeros.venderPasaje("05-03-2021", pasajero); // fecha: "2021-03-23" // destino: "Brasil"
      vueloCharter.venderPasaje("10-12-2021", pasajero); // fecha:  "2021-06-11" // destino : "Tahiti"
      vueloDePasajeros2.venderPasaje("10-3-2021", pasajero); // fecha:  "2022-11-07" // destino : "Tahiti"

      agencia.agregarVuelo(vueloDePasajeros);
      agencia.agregarVuelo(vueloCharter);
      agencia.agregarVuelo(vueloDePasajeros2);

      assert.deepEqual(
        ["2021-06-11", "2022-11-07"],
        agencia.fechasDeViaje(pasajero, "Tahiti")
      );
    });
  });
});
