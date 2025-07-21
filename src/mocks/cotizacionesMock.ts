// src/mocks/cotizacionesMock.ts
export const cotizacionesMock = [
  {
    nombre: "Dólar Oficial",
    compra: 860.50,
    venta: 880.50,
    variacion: 0.25,
    timestamp: new Date().toISOString()
  },
  {
    nombre: "Dólar Blue",
    compra: 985.00,
    venta: 1005.00,
    variacion: 1.5,
    timestamp: new Date().toISOString()
  },
  {
    nombre: "Dólar MEP",
    compra: 945.75,
    venta: 946.25,
    variacion: -0.5,
    timestamp: new Date().toISOString()
  },
  {
    nombre: "Dólar CCL",
    compra: 950.00,
    venta: 955.00,
    variacion: 0.75,
    timestamp: new Date().toISOString()
  }
];
