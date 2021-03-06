var assert = require("assert");
const Avion = require("../src/Avion");
const errores = require("../src/errores");
const VueloDePasajeros = require("../src/VueloDePasajeros");
const Segura = require("../src/Segura");
const LaxaFija = require("../src/LaxaFija");
const LaxaPorcentual = require("../src/LaxaPorcentual");
const Estricta = require("../src/Estricta");
const Pandemia = require("../src/Pandemia");
const Pasajero = require("../src/Pasajero");
const agencia = require("../src/Agencia");
const Ciudad = require("../src/Ciudad");

describe("Permitir la venta según la ciudad de origen", () => {
  let vueloDePasajeros, pasajero, buenosAires;
  // criterio general de la agencia = Segura;
  beforeEach(() => {
    vueloDePasajeros = new VueloDePasajeros(
      "23-03",
      new Avion(100, 8, 1000),
      "Buenos Aires",
      "Brasil",
      600,
      new Estricta()
    );

    pasajero = new Pasajero(26581333);
    agencia.reiniciarCiudadesOrigenConCriterio();

    buenosAires = new Ciudad("Buenos Aires", "America");
  });

  it("Se puede vender un pasaje si la ciudad de origen tiene un criterio que deja vender", () => {
    agencia.agregarCiudaDeOrigenConCriterio(buenosAires, new LaxaFija());

    for (i = 0; i < 9; i++) {
      vueloDePasajeros.venderPasaje("22-03-2021", pasajero); // 100 + 10% = 110 originales - Vendí 10 quedan 100 para vender
    }

    assert.equal(true, vueloDePasajeros.sePuedeVenderUnPasaje());
  });

  it("Se puede vender si la ciudad de origen no tiene ningún criterio y la agencia tiene un criterio general que lo permita", () => {
    for (i = 0; i < 2; i++) {
      vueloDePasajeros.venderPasaje("22-03-2021", pasajero); // dejamos 98 asientos libres - X condicion general podría vender (Segura)
    }

    assert.equal(true, vueloDePasajeros.sePuedeVenderUnPasaje());
  });
  it("No se puede vender si el criterio de la ciudad de origen no lo permite", () => {
    agencia.agregarCiudaDeOrigenConCriterio(buenosAires, new LaxaPorcentual());

    for (i = 0; i < 111; i++) {
      vueloDePasajeros.venderPasaje("22-03-2021", pasajero); // 100 + 10% = 110 originales - Vendí 110 No quedan para vender
    }

    assert.equal(false, vueloDePasajeros.sePuedeVenderUnPasaje());
  });
  it("No se puede vender si la ciudad de origen no tiene ningún criterio pero la agencia tiene un criterio general que no lo permite", () => {
    for (i = 0; i < 97; i++) {
      vueloDePasajeros.venderPasaje("22-03-2021", pasajero); // dejamos menos de 3 asientos libres X criterio general no podría venderse (Segura)
    }

    assert.equal(false, vueloDePasajeros.sePuedeVenderUnPasaje());
  });
});
