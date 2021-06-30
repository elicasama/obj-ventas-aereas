var assert = require("assert");
const Avion = require("../src/Avion");
const VueloDePasajeros = require("../src/VueloDePasajeros");
const Configuracion = require("../src/Configuracion");
const Segura = require("../src/Segura");
const Estricta = require("../src/Estricta");
const VueloDeCarga = require("../src/VueloDeCarga");
const VueloCharter = require("../src/VueloCharter");
const Agencia = require("../src/Agencia");

describe.only("Vuelos y Pasajeros", () => {
  beforeEach(() => {
    Configuracion.criterio = new Segura();
    vueloDePasajeros2 = new VueloDePasajeros(
        "07-11-2022",
        new Avion(100, 8, 1000),
        "Buenos Aires",
        "Tahiti",
        600,
        new Estricta()
      );

    vueloDePasajeros = new VueloDePasajeros(
      "23-03-2021",
      new Avion(100, 8, 1000),
      "Buenos Aires",
      "Brasil",
      600,
      new Estricta()
    );
    vueloDePasajeros.pasajesVendidos = [];
    vueloCharter = new VueloCharter(
      "10-06-2021",
      new Avion(300, 6, 3000),
      "Salta",
      "Tahiti",
      600,
      new Estricta()
    );
    vueloCharter.pasajesVendidos = [];
  });

  describe("Saber si un pasajero está en un vuelo determinado ", () => {
    it("Sí: si le vendieron un pasaje al dni 11111111", () => {
      vueloDePasajeros.venderPasaje("10-03-2021", 11111111);

      assert.equal(true, vueloDePasajeros.tienePasaje(11111111));
    });
    it("No: si no le vendieron un pasaje al dni 11111111", () => {
      vueloDePasajeros.venderPasaje("10-03-2021", 2222222);

      assert.equal(false, vueloDePasajeros.tienePasaje(11111111));
    });
  });

  describe("La Agencia tiene distintos vuelos", () => {
    it("Agregar un vuelo a la agencia", () => {
      vueloDePasajeros.venderPasaje("10-03-2021", 11111111);

      const agencia = new Agencia();
      agencia.agregarVuelo(vueloDePasajeros);

      assert.equal(1, agencia.cantidadDeVueltos());
    });
  });
  describe("Saber el / los vuelos de un pasajero", () => {
    it("Conocer los vuelos de un pasajero con dni dni 11111111", () => {
      const agencia = new Agencia();

      vueloDePasajeros.venderPasaje("10-03-2021", 11111111);
      vueloCharter.venderPasaje("10-23-2021", 11111111);

      agencia.agregarVuelo(vueloDePasajeros);
      agencia.agregarVuelo(vueloCharter);

      assert.deepEqual(
        [vueloDePasajeros, vueloCharter],
        agencia.vuelosDeUnPasajero(11111111)
      );
    });
  });

  describe("Fechas de los vuelos de un pasajero a un destino", () => {
    it("Conocer los vuelos de un pasajero con dni dni 11111111", () => {
      const agencia = new Agencia();

      vueloDePasajeros.venderPasaje("05-03-2021", 11111111);
      vueloCharter.venderPasaje("10-12-2021", 11111111); // fecha:  "10-06-2021" // destino : "Tahiti"
      vueloDePasajeros2.venderPasaje("10-3-2021", 11111111); // fecha:  "07-11-2022" // destino : "Tahiti"

      agencia.agregarVuelo(vueloDePasajeros);
      agencia.agregarVuelo(vueloCharter);
      agencia.agregarVuelo(vueloDePasajeros2);

      assert.deepEqual(["10-06-2021", "07-11-2022"], agencia.fechasDeViaje(11111111, "Tahiti"));
    });
  });
});

