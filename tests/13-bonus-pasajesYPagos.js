var assert = require("assert");
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

    buenosAiresMadrid.venderPasaje("2020-04-15", pasajero); // Importe de compra: 600
    buenosAiresNigeria.venderPasaje("2020-06-10", pasajero); // Importe de compra: 1000
    buenosAiresBrasil.venderPasaje("2020-07-11", pasajero); // Importe de compra: 150

    pasajeBuenosAiresMadrid = new Pasaje("2020-04-15", pasajero, 600);
    pasajeBuenosAiresBrasil = new Pasaje("2020-07-11", pasajero, 150);
    pasajeBuenosAiresNigeria = new Pasaje("2020-06-10", pasajero, 1000);
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

    it("Calcular el importe total de los pasajes comprados", () => {
      assert.equal(1750, agencia.totalDeComprasDelPasajero(pasajero));
    });
  });
});
