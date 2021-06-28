var assert = require("assert");
const Avion = require("../src/Avion");
//const Pasaje = require("../src/Pasaje")
//const Vuelo = require("../src/Vuelo")
const VueloDePasajeros = require("../src/VueloDePasajeros");
const VueloCharter = require("../src/VueloCharter");
const VueloDeCarga = require("../src/VueloDeCarga");
const Estricta = require("../src/Estricta");
const Segura = require("../src/Segura");
const Pandemia = require("../src/Pandemia");
const Remate = require("../src/Remate");
const Configuracion = require("../src/Configuracion");
const LaxaFija = require("../src/LaxaFija");
const { Console } = require("console");
const LaxaPorcentual = require("../src/LaxaPorcentual");

describe("Agencia de Vuelos", () => {
  beforeEach(() => {
    Configuracion.criterio = new Segura();
  });

  describe("Disponibilidades de asientos - antes de vender un pasaje", () => {
    it("Vuelo de carga, siempre tiene 10 asientos disponibles", () => {
      const vueloDeCarga = new VueloDeCarga(
        "23-03",
        new Avion(230, 2, 1000),
        "Buenos Aires",
        "Brasil",
        600
      );

      assert.equal(10, vueloDeCarga.cantidadAsientosLibres());
    });
    it("Vuelo Charter, es la cantidad disponible del avion - 25", () => {
      const vueloCharter = new VueloCharter(
        "23-03",
        new Avion(230, 2, 1000),
        "Buenos Aires",
        "Brasil",
        600
      );

      assert.equal(205, vueloCharter.cantidadAsientosLibres());
    });
    it("Vuelo de Pasajeros, es la cantidad disponible del avion", () => {
      const vueloDePasajeros = new VueloDePasajeros(
        "23-03",
        new Avion(230, 2, 1000),
        "Buenos Aires",
        "Brasil",
        600
      );

      assert.equal(230, vueloDePasajeros.cantidadAsientosLibres());
    });
  });

  describe("Es Relajado? (sin venta de pasajes) (cabina > 4 metros && menos de 100 asientos disponibles para pasajeros", () => {
    describe("Vuelo de carga (tiene 10 asientos libres de origen depende de la cabina)", () => {
      it("Sí: si la cabina es grande", () => {
        const vueloDeCarga = new VueloDeCarga(
          "23-03",
          new Avion(200, 5, 2000),
          "Buenos Aires",
          "Brasil",
          600
        );

        assert.equal(true, vueloDeCarga.esRelajado());
      });
      it("No: si la cabina es chica", () => {
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
    describe("Vuelo Charter (Cantidad de asientos del avion - 25 es la cantidad libre inicial)", () => {
      it("No: con más de 100 asientos libres", () => {
        const vueloCharter = new VueloCharter(
          "23-03",
          new Avion(230, 13, 1000), //--> asientos disponibles 205
          "Buenos Aires",
          "Brasil",
          600
        );

        assert.equal(false, vueloCharter.esRelajado());
      });
      it("No: con una cabina chica", () => {
        const vueloCharter = new VueloCharter(
          "23-03",
          new Avion(230, 2, 1000), //--> asientos disponibles 205
          "Buenos Aires",
          "Brasil",
          600
        );

        assert.equal(false, vueloCharter.esRelajado());
      });
      it("Sí: con menos de 100 asientos libres", () => {
        const vueloCharter = new VueloCharter(
          "23-03",
          new Avion(30, 13, 1000), //--> asientos disponibles 5
          "Buenos Aires",
          "Brasil",
          600
        );

        assert.equal(true, vueloCharter.esRelajado());
      });
    });

    describe("Vuelo de Pasajeros (Cantidad de asientos del avion)", () => {
      it("No: si tiene muchos asientos, aunque la cabina sea grande", () => {
        const vueloDePasajeros = new VueloDePasajeros(
          "23-03",
          new Avion(200, 8, 1000),
          "Buenos Aires",
          "Brasil",
          600
        );

        assert.equal(false, vueloDePasajeros.esRelajado());
      });
      it("No: si la cabina es chica aunque tenga pocos asientos", () => {
        const vueloDePasajeros = new VueloDePasajeros(
          "23-03",
          new Avion(90, 3, 1000),
          "Buenos Aires",
          "Brasil",
          600
        );

        assert.equal(false, vueloDePasajeros.esRelajado());
      });
      it("Sí: cuando cumple las condiciones", () => {
        const vueloDePasajeros = new VueloDePasajeros(
          "23-03",
          new Avion(90, 5, 1000),
          "Buenos Aires",
          "Brasil",
          600
        );

        assert.equal(true, vueloDePasajeros.esRelajado());
      });
    });
  });
  describe("Valores de los vuelos - varía según la política", () => {
    describe("Politica standar", () => {
      it("El precio es el mismo que se declaró como precio estandar", () => {
        const vueloDePasajeros = new VueloDePasajeros(
          "23-03",
          new Avion(200, 8, 1000),
          "Buenos Aires",
          "Brasil",
          600,
          new Estricta()
        );

        assert.equal(600, vueloDePasajeros.precioDelVuelo());
      });
    });
    describe("Politica Remate", () => {
      it("Si el vuelo tiene más de 30 asientos libres entonces corresponde el 25% del precio estándar", () => {
        const vueloDePasajeros = new VueloDePasajeros(
          "23-03",
          new Avion(200, 8, 1000),
          "Buenos Aires",
          "Brasil",
          600, // 150 sería el 25% del precio
          new Remate()
        );

        assert.equal(150, vueloDePasajeros.precioDelVuelo());
      });
      it("Si el vuelo tiene menos de 30 asientos libres entonces corresponde el 50% del precio estandar", () => {
        const vueloDePasajeros = new VueloDePasajeros(
          "23-03",
          new Avion(20, 8, 1000),
          "Buenos Aires",
          "Brasil",
          600, // 300 sería el 50% del precio
          new Remate()
        );

        assert.equal(300, vueloDePasajeros.precioDelVuelo());
      });
    });
    it("Faltan los otros criterios", () => {});
  });

  describe("Venta según criterio", () => {
    describe("Segura", () => {
      it("Se puede vender si hay más de 3 asientos libres", () => {
        const vueloDePasajeros = new VueloDePasajeros(
          "23-03",
          new Avion(200, 8, 1000),
          "Buenos Aires",
          "Brasil",
          600,
          new Estricta()
        );

        assert.equal(true, vueloDePasajeros.sePuedeVenderUnPasaje());
      });
      it("No se puede vender si hay menos de 3 asientos libres", () => {
        const vueloDePasajeros = new VueloDePasajeros(
          "23-03",
          new Avion(2, 8, 1000),
          "Buenos Aires",
          "Brasil",
          600,
          new Estricta()
        );

        assert.equal(false, vueloDePasajeros.sePuedeVenderUnPasaje());
      });
    });
    describe("Laxa Simple - Se puede vender en cada vuelo hasta 10 pasajes más de los asientos disponibles.", () => {
      it("Puedo vender si se vendieron menos de capacidad del avión + 10", () => {
        Configuracion.criterio = new LaxaFija();
        const vueloDePasajeros = new VueloDePasajeros(
          "23-03",
          new Avion(100, 8, 1000),
          "Buenos Aires",
          "Brasil",
          600,
          new Estricta()
        );

        vueloDePasajeros.pasajesVendidos = 12; // Tenía 100 disponible + 10 y vendí 12

        assert.equal(true, vueloDePasajeros.sePuedeVenderUnPasaje());
      });

      it("No puedo vender si superé la capacidad del avión + 10 ", () => {
        Configuracion.criterio = new LaxaFija();
        const vueloDePasajeros = new VueloDePasajeros(
          "23-03",
          new Avion(1, 8, 1000),
          "Buenos Aires",
          "Brasil",
          600,
          new Estricta()
        );

        vueloDePasajeros.pasajesVendidos = 11; // Tenía 1 disponible + 10 y vendí 11

        assert.equal(false, vueloDePasajeros.sePuedeVenderUnPasaje());
      });
    });

    describe("Laxa Porcentual - Se puede vender en cada vuelo hasta 10% más de los asientos disponibles.", () => {
      let vueloDePasajeros;

      beforeEach(() => {
        Configuracion.criterio = new LaxaPorcentual();
        vueloDePasajeros = new VueloDePasajeros(
          "23-03",
          new Avion(100, 8, 1000),
          "Buenos Aires",
          "Brasil",
          600,
          new Estricta()
        );
      });

      it("Puedo vender si no se superó el 10% de la capacidad total", () => {
        vueloDePasajeros.pasajesVendidos = 100; // quedan 10 para vender

        assert.equal(true, vueloDePasajeros.sePuedeVenderUnPasaje());
      });

      it("No puedo vender si se superó el 10% de la capacidad total", () => {
        vueloDePasajeros.pasajesVendidos = 111; // quedan 0
        assert.equal(false, vueloDePasajeros.sePuedeVenderUnPasaje());
      });
    });

    describe("Pandemia", () => {
      it("No se pueden vender vuelos", () => {
        Configuracion.criterio = new Pandemia();
        const vueloDePasajeros = new VueloDePasajeros(
          "23-03",
          new Avion(200, 8, 1000),
          "Buenos Aires",
          "Brasil",
          600,
          new Estricta()
        );

        assert.equal(false, vueloDePasajeros.sePuedeVenderUnPasaje());
      });
    });
  });
});