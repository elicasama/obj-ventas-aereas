var assert = require("assert");
const Avion = require("../src/Avion");
const errores = require("../src/errores");
const Configuracion = require("../src/Configuracion");
const VueloDePasajeros = require("../src/VueloDePasajeros");
const Segura = require("../src/Segura");
const Estricta = require("../src/Estricta");
const Pandemia = require("../src/Pandemia");
const LaxaFija = require("../src/LaxaFija");
const LaxaPorcentual = require("../src/LaxaPorcentual");
const Pasajero = require("../src/Pasajero");

describe("Permitir la venta según criterio", () => {
  let vueloDePasajeros, pasajero;


  beforeEach(() => {
    Configuracion.criterio = new Segura();
    vueloDePasajeros = new VueloDePasajeros(
      "23-03",
      new Avion(100, 8, 1000),
      "Buenos Aires",
      "Brasil",
      600,
      new Estricta()
    );
    vueloDePasajeros.pasajesVendidos = [];
    pasajero = new Pasajero(26581333)
  });

  describe("Segura", () => {
    it("Se puede vender si hay más de 3 asientos libres", () => {
      for (i = 0; i < 2; i++) {
        vueloDePasajeros.venderPasaje("22-03-2021", pasajero); // dejamos 98 asientos libres
      }

      assert.equal(true, vueloDePasajeros.sePuedeVenderUnPasaje());
    });
    it("No se puede vender si hay menos de 3 asientos libres", () => {
      for (i = 0; i < 97; i++) {
        vueloDePasajeros.venderPasaje("22-03-2021", pasajero); // dejamos menos de 3 asientos libres
      }

      assert.equal(false, vueloDePasajeros.sePuedeVenderUnPasaje());
    });
  });

  describe("Laxa Fija - Se puede vender en cada vuelo hasta 10 pasajes más de los asientos disponibles.", () => {
    beforeEach(() => {
      Configuracion.criterio = new LaxaFija();
    });

    it("Puedo vender si se vendieron menos de capacidad del avión + 10", () => {
      for (i = 0; i < 9; i++) {
        vueloDePasajeros.venderPasaje("22-03-2021", pasajero); // 100 + 10% = 110 originales - Vendí 10 quedan 100 para vender
      }

      assert.equal(true, vueloDePasajeros.sePuedeVenderUnPasaje());
    });
    it("No puedo vender si superé la capacidad del avión + 10 ", () => {
      for (i = 0; i < 110; i++) {
        vueloDePasajeros.venderPasaje("22-03-2021", pasajero); // 100 + 10% = 110 originales - Vendí 110 No podría vender
      }

      assert.throws(() => {
        vueloDePasajeros.venderPasaje("22-03-2021", pasajero);
      }, errores.NoSePuedeVenderElPasaje);
    });
  });

  describe("Laxa Porcentual - Se puede vender en cada vuelo hasta 10% más de los asientos disponibles.", () => {
    beforeEach(() => {
      Configuracion.criterio = new LaxaPorcentual();
    });

    it("Puedo vender si no se superó el 10% de la capacidad total", () => {
      for (i = 0; i < 10; i++) {
        vueloDePasajeros.venderPasaje("22-03-2021", pasajero); // 100 + 10% = 110 originales - Vendí 10 quedan 100 para vender
      }

      assert.equal(true, vueloDePasajeros.sePuedeVenderUnPasaje());
    });
    it("No puedo vender si se superó el 10% de la capacidad total", () => {
      for (i = 0; i < 111; i++) {
        vueloDePasajeros.venderPasaje("22-03-2021", pasajero); // 100 + 10% = 110 originales - Vendí 110 No quedan para vender
      }

      assert.throws(() => {
        vueloDePasajeros.venderPasaje("22-03-2021", pasajero);
      }, errores.NoSePuedeVenderElPasaje);
    });
  });

  describe("Pandemia", () => {
    beforeEach(() => {
      Configuracion.criterio = new Pandemia();
    });
    it("No se pueden vender vuelos", () => {
      assert.throws(() => {
        vueloDePasajeros.venderPasaje("22-03-2021", pasajero);
      }, errores.NoSePuedeVenderElPasaje);
    });
  });
});
