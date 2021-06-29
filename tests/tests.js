var assert = require("assert");
const Avion = require("../src/Avion");
const errores = require("../src/errores");
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
const VentaAnticipada = require("../src/VentaAnticipada");
const Pasaje = require("../src/Pasaje");

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
      it("No: si tiene muchos más de 100 asientos, aunque la cabina sea grande", () => {
        const vueloDePasajeros = new VueloDePasajeros(
          "23-03",
          new Avion(200, 8, 1000),
          "Buenos Aires",
          "Brasil",
          600
        );

        assert.equal(false, vueloDePasajeros.esRelajado());
      });
      it("No: si la cabina es chica aunque tenga menos de 100 asientos", () => {
        const vueloDePasajeros = new VueloDePasajeros(
          "23-03",
          new Avion(90, 3, 1000),
          "Buenos Aires",
          "Brasil",
          600
        );

        assert.equal(false, vueloDePasajeros.esRelajado());
      });
      it("Sí: cuando cumple las condiciones (menos de 100 asientos y cabina grande)", () => {
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

    describe("Politica Venta Anticipada", () => {
      let vueloDePasajeros;

      beforeEach(() => {
        vueloDePasajeros = new VueloDePasajeros(
          "23-03",
          new Avion(100, 8, 1000),
          "Buenos Aires",
          "Brasil",
          600,
          new VentaAnticipada()
        );
        vueloDePasajeros.pasajesVendidos = [];
      });

      it("Si el vuelo tiene menos de 40 pasajes vendidos, 30% del precio estándar", () => {
        const pasaje = new Pasaje(
          "22-03-2021",
          26581333,
          vueloDePasajeros.precioDelVuelo()
        );

        for (i = 0; i < 30; i++) {
          vueloDePasajeros.venderPasaje(pasaje);
        }
        assert.equal(180, vueloDePasajeros.precioDelVuelo()); // 180 es el 60% de 600
      });
      it("Si el vuelo tiene entre 40 y 79 pasajes vendidos, 60%, del precio estándar", () => {
        const pasaje = new Pasaje(
          "22-03-2021",
          26581333,
          vueloDePasajeros.precioDelVuelo()
        );

        for (i = 0; i < 60; i++) {
          vueloDePasajeros.venderPasaje(pasaje);
        }
        
        assert.equal(360, vueloDePasajeros.precioDelVuelo()); // 360 es el 60% de 600
      });
      it("Caso contrario (más de 79), corresponde el precio estándar completo", () => {
        const pasaje = new Pasaje(
          "22-03-2021",
          26581333,
          vueloDePasajeros.precioDelVuelo()
        );

        for (i = 0; i < 80; i++) {
          vueloDePasajeros.venderPasaje(pasaje);
        }
        
        assert.equal(600, vueloDePasajeros.precioDelVuelo());
      });
    });
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
    describe("Laxa Fija - Se puede vender en cada vuelo hasta 10 pasajes más de los asientos disponibles.", () => {
      let vueloDePasajeros;

      beforeEach(() => {
        Configuracion.criterio = new LaxaFija();
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
      it("Puedo vender si se vendieron menos de capacidad del avión + 10", () => {
        const pasaje = new Pasaje(
          "22-03-2021",
          26581333,
          vueloDePasajeros.precioDelVuelo()
        );
        for (i = 0; i < 9; i++) {
          vueloDePasajeros.venderPasaje(pasaje); // 100 + 10% = 110 originales - Vendí 10 quedan 100 para vender
        }

        assert.equal(true, vueloDePasajeros.sePuedeVenderUnPasaje());
      });

      it("No puedo vender si superé la capacidad del avión + 10 ", () => {
        const pasaje = new Pasaje(
          "22-03-2021",
          26581333,
          vueloDePasajeros.precioDelVuelo()
        );
        for (i = 0; i < 110; i++) {
          vueloDePasajeros.venderPasaje(pasaje); // 100 + 10% = 110 originales - Vendí 110 No podría vender
        }
        
                
        assert.throws(() => {
          vueloDePasajeros.venderPasaje(pasaje);
        }, errores.NoSePuedeVenderElPasaje);
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
        vueloDePasajeros.pasajesVendidos = [];
      });

      it("Puedo vender si no se superó el 10% de la capacidad total", () => {
        const pasaje = new Pasaje(
          "22-03-2021",
          26581333,
          vueloDePasajeros.precioDelVuelo()
        );
        for (i = 0; i < 10; i++) {
          vueloDePasajeros.venderPasaje(pasaje); // 100 + 10% = 110 originales - Vendí 10 quedan 100 para vender
        }

        assert.equal(true, vueloDePasajeros.sePuedeVenderUnPasaje());
      });

      it("No puedo vender si se superó el 10% de la capacidad total", () => {
        const pasaje = new Pasaje(
          "22-03-2021",
          26581333,
          vueloDePasajeros.precioDelVuelo()
        );

        for (i = 0; i < 111; i++) {
          vueloDePasajeros.venderPasaje(pasaje); // 100 + 10% = 110 originales - Vendí 110 No quedan para vender
        }

        assert.throws(() => {
          vueloDePasajeros.venderPasaje(pasaje);
        }, errores.NoSePuedeVenderElPasaje);
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
        const pasaje = new Pasaje(
          "22-03-2021",
          26581333,
          vueloDePasajeros.precioDelVuelo()
        );
       
        assert.throws(() => {
          vueloDePasajeros.venderPasaje(pasaje);
        }, errores.NoSePuedeVenderElPasaje);
      });
    });
  });
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
      const pasaje = new Pasaje(
        "22-03-2021",
        26581333,
        vueloDePasajeros.precioDelVuelo()
      );
      assert.throws(() => {
        vueloDePasajeros.venderPasaje(pasaje);
      }, errores.NoSePuedeVenderElPasaje);
    });

    it("Sin Restricciones - puede vender", () => {
      Configuracion.criterio = new Segura(); // al ser una politica segura puede vender el pasaje, hay más de 3 libres

      const pasaje = new Pasaje(
        "22-03-2021",
        26581333,
        vueloDePasajeros.precioDelVuelo()
      );

      vueloDePasajeros.venderPasaje(pasaje);
      assert.equal(1, vueloDePasajeros.pasajesVendidos.length);
    });
  });
});
