var assert = require("assert");
const Avion = require("../src/Avion");
const VueloDePasajeros = require("../src/VueloDePasajeros");
const Estricta = require("../src/Estricta");
const VueloCharter = require("../src/VueloCharter");
const agencia = require("../src/Agencia");
const Pasajero = require("../src/Pasajero");

describe("Vuelos entre fechas", () => {
  let vueloDePasajeros, vueloDePasajeros2, vueloCharter, pasajero;

  beforeEach(() => {
    vueloDePasajeros = new VueloDePasajeros(
      "2021-03-23",
      new Avion(100, 8, 1000),
      "Buenos Aires",
      "Brasil",
      600,
      new Estricta()
    );

    vueloDePasajeros2 = new VueloDePasajeros(
      "2022-11-07",
      new Avion(100, 8, 1000),
      "Buenos Aires",
      "Tahiti",
      600,
      new Estricta()
    );

    vueloCharter = new VueloCharter(
      "2021-06-11",
      new Avion(300, 6, 3000),
      "Salta",
      "Tahiti",
      600,
      new Estricta()
    );

    agencia.vuelos = [];
    agencia.agregarVuelo(vueloDePasajeros);
    agencia.agregarVuelo(vueloCharter);
    agencia.agregarVuelo(vueloDePasajeros2);

    pasajero = new Pasajero(11111111);

    vueloDePasajeros.venderPasaje("2021-05-11", pasajero);
    vueloCharter.venderPasaje("2021-05-10", pasajero);
    vueloDePasajeros2.venderPasaje("2021-06-10", pasajero);
  });

  describe("Vuelos entre dos fechas", () => {
    it("Identificar los vuelos de la agencia entre dos fechas", () => {
      //vueloDePasajeros -->    fecha: "23-03-2021" // destino: "Brasil"
      //vueloCharter -->        fecha: "10-06-2021" // destino : "Tahiti"
      //vueloDePasajeros2 -->   fecha: "07-11-2022" // destino : "Tahiti"

      assert.deepEqual(
        [vueloCharter, vueloDePasajeros2],
        agencia.vuelosEntreFechas("2021-05-12", "2024-05-10")
      );
    });
  });

  describe("Vuelos por destino", () => {
    it("Listar vuelos según un destino", () => {
      //   vueloDePasajeros -->  destino: "Brasil"
      //   vueloCharter --> destino : "Tahiti"
      //   vueloDePasajeros2 --> destino : "Tahiti"

      assert.deepEqual(
        [vueloCharter, vueloDePasajeros2],
        agencia.vuelosPorDestino("Tahiti")
      );
    });
    it("Vuelos a un destino entre fechas", () => {
      // vueloDePasajeros --> fecha: "23-03-2021" // destino: "Brasil"
      // vueloCharter -->     fecha:  "10-06-2021" // destino : "Tahiti"
      // vueloDePasajeros2--> fecha:  "07-11-2022" // destino : "Tahiti"

      assert.deepEqual(
        [vueloCharter, vueloDePasajeros2],
        agencia.vuelosParaUnDestinoEntreFechas(
          "Tahiti",
          "2021-05-12",
          "2024-05-10"
        )
      );
    });
    it("Asientos libres entre los vuelos a un destino entre unas fechas", () => {
      // vueloDePasajeros --> fecha: "23-03-2021" // destino: "Brasil" //asientos: 99
      // vueloCharter -->     fecha:  "10-06-2021" // destino : "Tahiti" //asientos: 99 - 25 (por ser charter)
      // vueloDePasajeros2--> fecha:  "07-11-2022" // destino : "Tahiti" //asientos: 299

      assert.equal(
        373,
        agencia.asientosLibresEntreVuelos("Tahiti", "2021-05-12", "2024-05-10")
      );
    });
  });
});
