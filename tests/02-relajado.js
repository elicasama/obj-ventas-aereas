var assert = require("assert");
const Avion = require("../src/Avion");
const errores = require("../src/errores");
const VueloDePasajeros = require("../src/VueloDePasajeros");
const VueloCharter = require("../src/VueloCharter");
const VueloDeCarga = require("../src/VueloDeCarga");

describe("Es Relajado?", () => {
  it("No: si la cabina < 4 metros aunque tenga menos de 100 asientos disponibles", () => {
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
it("No: con cabina > 4 metros pero más de 100 asientos disponibles", () => {
  const vueloCharter = new VueloCharter(
    "23-03",
    new Avion(300, 13, 1000), //--> asientos disponibles 205
    "Buenos Aires",
    "Brasil",
    600
  );

  assert.equal(false, vueloCharter.esRelajado());
});
it("Sí: con cabina > 4 metros y  menos de 100 asientos disponibles", () => {
  const vueloCharter = new VueloCharter(
    "23-03",
    new Avion(30, 13, 1000), //--> asientos disponibles 5
    "Buenos Aires",
    "Brasil",
    600
  );

  assert.equal(true, vueloCharter.esRelajado());
});
