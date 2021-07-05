var assert = require("assert");
const errores = require("../src/errores");
const Avion = require("../src/Avion");
const VueloDePasajeros = require("../src/VueloDePasajeros");
const Estricta = require("../src/Estricta");
const Segura = require("../src/Segura");
const Pandemia = require("../src/Pandemia");
const agencia = require("../src/Agencia")

describe("Venta de Pasaje", () => {
  let vueloDePasajeros;
  beforeEach(() => {
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
  it("Vuelo en pandemia - No se puede vender", () => {
    agencia.criterio = new Pandemia();

    assert.throws(() => {
      vueloDePasajeros.venderPasaje("22-03-2021", 26581333);
    }, errores.NoSePuedeVenderElPasaje);
  });

  it("Sin Restricciones - Se puede vender si las condiciones se cumplen dependiendo de otros factores", () => {
    agencia.criterio = new Segura(); // al ser una política segura puede vender el pasaje, hay más de 3 libres (tenemos 99 libres)

    vueloDePasajeros.venderPasaje("22-03-2021", 26581333);
    assert.equal(1, vueloDePasajeros.cantidadAsientosVendidos());
  });
});
