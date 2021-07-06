var assert = require("assert");
const Avion = require("../src/Avion");
const VueloDePasajeros = require("../src/VueloDePasajeros");
const Estricta = require("../src/Estricta");
const agencia = require("../src/Agencia");
const Ciudad = require("../src/Ciudad");

describe("Vuelos Intercontinentales", () => {
  let buenosAires_madrid,
    buenosAires_brasil,
    buenosAires_nigeria,
    madrid_nigeria,
    francia_brasil,
    francia_madrid,
    buenosAires,
    madrid,
    nigeria,
    brasil,
    francia;
  beforeEach(() => {
    buenosAires = new Ciudad("Buenos Aires", "America");
    madrid = new Ciudad("Madrid", "Europa");
    nigeria = new Ciudad("Nigeria", "Africa");
    brasil = new Ciudad("Brasil", "America");
    francia = new Ciudad("Francia", "Europa");

    buenosAires_madrid = new VueloDePasajeros(
      "2021-05-12",
      new Avion(100, 8, 1000),
      buenosAires,
      madrid,
      600,
      new Estricta()
    );

    buenosAires_brasil = new VueloDePasajeros(
      "2021-05-12",
      new Avion(100, 8, 1000),
      buenosAires,
      brasil,
      600,
      new Estricta()
    );

    buenosAires_nigeria = new VueloDePasajeros(
      "2021-05-12",
      new Avion(100, 8, 1000),
      buenosAires,
      nigeria,
      600,
      new Estricta()
    );

    madrid_nigeria = new VueloDePasajeros(
      "2021-02-22",
      new Avion(100, 8, 1000),
      madrid,
      nigeria,
      600,
      new Estricta()
    );

    francia_brasil = new VueloDePasajeros(
      "2022-04-15",
      new Avion(100, 8, 1000),
      francia,
      brasil,
      600,
      new Estricta()
    );

    francia_madrid = new VueloDePasajeros(
      "2021-02-22",
      new Avion(100, 8, 1000),
      francia,
      madrid,
      600,
      new Estricta()
    );
    agencia.vuelos = [];
    agencia.agregarVuelo(buenosAires_madrid); // fecha "2021-05-12" - intercontinental
    agencia.agregarVuelo(buenosAires_nigeria); // fecha "2021-05-12" - intercontinental
    agencia.agregarVuelo(buenosAires_brasil); // fecha "2021-05-12" - NO intercontinental

    agencia.agregarVuelo(madrid_nigeria); // fecha "2021-02-22" - intercontinental
    agencia.agregarVuelo(francia_madrid); // fecha "2021-02-22" - NO intercontinental

    agencia.agregarVuelo(francia_brasil); // fecha "2022-04-15" - intercontinental
  });
  it("Debe indicar si un vuelo es intercontinental", () => {
    assert.equal(true, buenosAires_madrid.esInercontinental());
  });

  it("Debe indicar si un vuelo no es intercontinental", () => {
    assert.equal(false, buenosAires_brasil.esInercontinental());
  });

  it("Debe devolver la cantidad de vuelos para el 2021-05-12 ", () => {
    assert.equal(3, agencia._vuelosParaUnaFecha("2021-05-12").length);
  });

  it("Debe devolver la cantidad de vuelos intercontinentales para el 2021-02-22 ", () => {
    assert.equal(
      2,
      agencia.vuelosIntercontinentalesParaUnDía("2021-05-12").length
    );
  });

  it("Debe devolver todos los vuelos intercontinentales para el 2021-05-12 ", () => {
    assert.deepEqual(
      [buenosAires_madrid, buenosAires_nigeria],
      agencia.vuelosIntercontinentalesParaUnDía("2021-05-12")
    );
  });
});
