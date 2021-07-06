var assert = require("assert");
var _ = require("lodash");
const Avion = require("../src/Avion");
const VueloDePasajeros = require("../src/VueloDePasajeros");
const Estricta = require("../src/Estricta");
const Remate = require("../src/Remate");
const agencia = require("../src/Agencia");
const Ciudad = require("../src/Ciudad");
const Pasajero = require("../src/Pasajero");
const Pasaje = require("../src/Pasaje");

describe.only("Pasajes comprados y pagados", () => {
  let buenosAiresMadrid,
    buenosAiresBrasil,
    buenosAiresNigeria,
    buenosAires,
    madrid,
    nigeria,
    brasil,
    pasajero,
    pasajero2,
    pasajeBuenosAiresMadrid,
    pasajeBuenosAiresBrasil,
    pasajeBuenosAiresNigeria;

  beforeEach(() => {
    buenosAires = new Ciudad("Buenos Aires", "America");
    madrid = new Ciudad("Madrid", "Europa");
    nigeria = new Ciudad("Nigeria", "Africa");
    brasil = new Ciudad("Brasil", "America");
    francia = new Ciudad("Francia", "Europa");

    buenosAiresMadrid = new VueloDePasajeros(
      "2021-05-12",
      new Avion(100, 8, 1000),
      buenosAires,
      madrid,
      600,
      new Estricta()
    );

    buenosAiresBrasil = new VueloDePasajeros(
      "2021-05-12",
      new Avion(200, 8, 1000),
      buenosAires,
      brasil,
      600, // 150 sería el 25% del precio
      new Remate()
    );

    buenosAiresNigeria = new VueloDePasajeros(
      "2021-05-12",
      new Avion(100, 8, 1000),
      buenosAires,
      nigeria,
      1000,
      new Estricta()
    );

    agencia.vuelos = [];
    agencia.agregarVuelo(buenosAiresMadrid); // fecha "2021-05-12" - intercontinental
    agencia.agregarVuelo(buenosAiresNigeria); // fecha "2021-05-12" - intercontinental
    agencia.agregarVuelo(buenosAiresBrasil); // fecha "2021-05-12" - NO intercontinental

    buenosAiresMadrid.pasajesVendidos = [];
    buenosAiresNigeria.pasajesVendidos = [];
    buenosAiresBrasil.pasajesVendidos = [];

    pasajero = new Pasajero(11111111);
    pasajero2 = new Pasajero(22222222);

    buenosAiresMadrid.venderPasaje("2020-04-15", pasajero); // Importe de compra: 600
    pasajeBuenosAiresMadrid = _.last(buenosAiresMadrid.pasajesVendidos);

    buenosAiresMadrid.venderPasaje("2020-04-15", pasajero2); // Importe de compra: 600

    buenosAiresNigeria.venderPasaje("2020-06-10", pasajero); // Importe de compra: 1000
    pasajeBuenosAiresNigeria = _.last(buenosAiresNigeria.pasajesVendidos);

    buenosAiresBrasil.venderPasaje("2020-07-11", pasajero); // Importe de compra: 150
    pasajeBuenosAiresBrasil = _.last(buenosAiresBrasil.pasajesVendidos);
  });

  describe("Pasajes comprados por un pasajero y el importe de los mismos", () => {
    it("Mostrar la cantidad de pasajes comprados", () => {
      assert.equal(3, agencia.pasajesDe(pasajero).length);
    });
    it("Mostrar el pasaje para buenosAiresBrasil", () => {
      assert.deepEqual(
        pasajeBuenosAiresBrasil,
        buenosAiresBrasil.pasajeDe(pasajero)
      );
    });
    it("Mostrar los pasajes de un pasajero", () => {
      assert.deepEqual(
        [
          pasajeBuenosAiresMadrid,
          pasajeBuenosAiresNigeria,
          pasajeBuenosAiresBrasil,
        ],
        agencia.pasajesDe(pasajero)
      );
    });
    it("Mostrar el importe abonado en un pasaje, por ejemplo buenosAiresBrasil", () => {
      assert.equal(150, buenosAiresBrasil.importeDeUnPasajeVendido(pasajero));
    });
    it("Calcular el importe total de los pasajes comprados por un pasajero", () => {
      assert.equal(1750, agencia.totalDeComprasDelPasajero(pasajero));
    });
  });

  describe("Pago de los pasajes", () => {
    it("Si pagó una parte del pasaje debe quedar el resto Ej Pasaje = 600 Pago Realizado = 100 Restan = 300", () => {
      buenosAiresMadrid.pagarUnPasaje(pasajero, 100);

      assert.equal(500, pasajeBuenosAiresMadrid.saldoAPagar());
    });
    it("Si realiza varios pagos tiene que ir descontando Ej Pasaje = 600 Pago Realizado = 100 * 3  Restan = 300", () => {
      buenosAiresMadrid.pagarUnPasaje(pasajero, 100);
      buenosAiresMadrid.pagarUnPasaje(pasajero, 100);
      buenosAiresMadrid.pagarUnPasaje(pasajero, 100);

      assert.equal(300, pasajeBuenosAiresMadrid.saldoAPagar());
    });
    it("Saber el total de los pagos realizado para el vuelo por distintos pasajeros", () => {
      buenosAiresMadrid.pagarUnPasaje(pasajero, 200);
      buenosAiresMadrid.pagarUnPasaje(pasajero2, 600);

      assert.equal(800, buenosAiresMadrid.importeCobrado());
    });
  });
  describe.only("Deudas", () => {
    it("Calcular el total de pagos de un pasajero en distintos pasajes", () => {
      buenosAiresMadrid.pagarUnPasaje(pasajero, 200);
      buenosAiresNigeria.pagarUnPasaje(pasajero, 800);
      buenosAiresBrasil.pagarUnPasaje(pasajero, 100);

      assert.equal(1100, agencia.pagosRealizadosPor(pasajero));
    });
    it("La deuda de un pasajero es la diferencia entre los pasajes comprados y los importes pagados", () => {
      // sabemos que el pasajero tiene una compra de pasajes por 1750 = gracias a: agencia.totalDeComprasDelPasajero(pasajero)
      buenosAiresMadrid.pagarUnPasaje(pasajero, 200);
      buenosAiresMadrid.pagarUnPasaje(pasajero, 200);
      buenosAiresNigeria.pagarUnPasaje(pasajero, 1000);
      buenosAiresBrasil.pagarUnPasaje(pasajero, 100);

      assert.equal(250, agencia.deudaDeUn(pasajero));
    });
  });
});
