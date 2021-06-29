var assert = require("assert");
const Configuracion = require("../src/Configuracion");
const errores = require("../src/errores");
const Avion = require("../src/Avion");
const VueloDePasajeros = require("../src/VueloDePasajeros");
const Estricta = require("../src/Estricta");
const Segura = require("../src/Segura");
const Pandemia = require("../src/Pandemia");

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
  it("Vuelo en pandemia - No podría vender", () => {
    Configuracion.criterio = new Pandemia();

    assert.throws(() => {
      vueloDePasajeros.venderPasaje("22-03-2021", 26581333);
    }, errores.NoSePuedeVenderElPasaje);
  });

  it("Sin Restricciones - Se puede vender si las condiciones se cumplen", () => {
    Configuracion.criterio = new Segura(); // al ser una politica segura puede vender el pasaje, hay más de 3 libres (tenemos 99 libres)

    vueloDePasajeros.venderPasaje("22-03-2021", 26581333);
    assert.equal(1, vueloDePasajeros.cantidadAsientosVendidos());
  });
});
