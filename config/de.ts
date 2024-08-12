import moment from "moment";

export const deValues = {
   tipoDocumento: {
      1: "Factura electrónica",
      4: "Autofactura electrónica",
      5: "Nota de crédito electrónica",
      6: "Nota de débito electrónica",
      7: "Nota de remisión electrónica",
   },
   tipoEmision: {
      1: "Normal",
      2: "Contingencia",
   },
   tipoTransaccion: {
      1: "Venta de mercadería",
      2: "Prestación de servicios",
      3: "Mixto (Venta de mercadería y servicios)",
      4: "Venta de activo fijo",
      5: "Venta de divisas",
      6: "Compra de divisas",
      7: "Promoción o entrega de muestras",
      8: "Donación",
      9: "Anticipo",
      10: "Compra de Productos",
      11: "Venta de Crédito fiscal",
      12: "Compra de Crédito fiscal",
      13: "Muestras médicas",
   },
   tipoImpuesto: {
      1: "IVA",
      2: "ISC",
      3: "Renta",
      4: "Ninguno",
      5: "IVA - Renta",
   },
   condicionAnticipo: {
      1: "Anticipo Global",
      2: "Anticipo por ítem",
   },
   condicionTipoCambio: {
      1: "Global",
      2: "Por ítem",
   },
   factura: {
      presencia: {
         1: "Operación presencial",
         2: "Operación electrónica",
         3: "Operación telemarketing",
         4: "Venta a domicilio",
         5: "Operación bancaria",
         6: "Operación cíclica",
         9: "Otro",
      },
   },
   condicion: {
      tipo: {
         1: "Contado",
         2: "Crédito",
      },
      entregas: [
         {
            tipo: {
               1: "Efectivo",
               2: "Cheque",
               3: "Tarjeta de crédito",
               4: "Tarjeta de débito",
            },
            infoTarjeta: {
               tipo: {
                  1: "Visa",
                  2: "Mastercard",
                  3: "American Express",
                  4: "Maestro",
                  5: "Panal",
                  6: "Cabal",
                  99: "Otro",
               },
               medioPago: {
                  1: "POS",
                  2: "Pago Electrónico",
                  9: "Otro",
               },
            },
         },
      ],
   },
   transporte: {
      tipo: {
         1: "Propio",
         2: "Tercero",
      },
      modalidad: {
         1: "Terrestre",
         2: "Fluvial",
         3: "Aéreo",
         4: "Multimodal",
      },
      tipoResponsable: {
         1: "Emisor de la Factura Electrónica",
         2: "Receptor de la Factura Electrónica",
         3: "Tercero",
         4: "Agente intermediario del transporte",
         5: "Transporte propio",
      },
      condicionNegociacion: {
         CFR: "Costo y flete",
         CIF: "Costo, seguro y flete",
         CIP: "Transporte y seguro pagados hasta",
         CPT: "Transporte pagado hasta",
         DAP: "Entregada en lugar convenido",
         DAT: "Entregada en terminal",
         DDP: "Entregada derechos pagados",
         EXW: "En fabrica",
         FAS: "Franco al costado del buque",
         FCA: "Franco transportista",
         FOB: "Franco a bordo",
      },
      vehiculo: {
         documentoTipo: {
            1: "Número de identificación del vehículo",
            2: "Número de matrícula del vehículo",
         },
      },
   },
   complementarios: {
      carga: {
         caracteristicaCarga: {
            1: "Mercaderías con cadena de frío",
            2: "Carga peligrosa",
            3: "Otro de características similares",
         },
      },
   },
   cliente: {
      tipoContribuyente: {
         1: "Persona física",
         2: "Persona Jurídica",
      },
      documentoTipo: {
         1: "Cédula paraguaya",
         2: "Pasaporte",
         3: "Cédula extranjera",
         4: "Carnet de residencia",
         5: "Innominado",
         6: "Tarjeta Diplomática de exoneración fiscal",
         9: "Informar",
      },
      tipoOperacion: {
         1: "B2B",
         2: "B2C",
         3: "B2G",
         4: "B2F",
      },
   },
   usuario: {
      documentoTipo: {
         1: "Cédula paraguaya",
         2: "Pasaporte",
         3: "Cédula extranjera",
         4: "Carnet de residencia",
         5: "Innominado",
         6: "Tarjeta Diplomática de exoneración fiscal",
         9: "Informar",
      },
   },
};

export const deFormData = {
   tipoDocumento: "1",
   establecimiento: "001",
   codigoSeguridadAleatorio: "",
   puntoExpedicion: "",
   // contributor.value.establecimientos[0]?.puntoExpedicion[0]?.nroActual
   descripcion: "",
   observacion: "",
   // (new Date()).toISOString().toString().substring(0, 19)
   fecha: moment().format("YYYY-MM-DDTHH:mm"),
   tipoEmision: 1,
   tipoTransaccion: 2,
   tipoImpuesto: 1,
   moneda: "PYG",
   cambio: 0,
   condicionTipoCambio: 1,
   factura: {
      presencia: 1,
   },
   condicion: {
      tipo: 1,
      entregas: [
         {
            tipo: 1,
            moneda: "PYG",
            monto: 0,
         },
      ],
   },
   cliente: {
      contribuyente: false,
      razonSocial: "",
      ruc: "",
      tipoContribuyente: 1,
      tipoOperacion: 1,
      documentoTipo: 1,
      documentoNumero: "",
      email: "",
      telefono: "",
      pais: "PRY",
   },
   items: [],
};

export const deItemData = {
   codigo: "1",
   descripcion: "",
   observacion: "",

   // @todo defined in comerce
   unidadMedida: "77",
   cantidad: "",
   precioUnitario: "",
   cambio: null,
   ivaTipo: "1",
   ivaBase: 100,
   iva: "10",
   lote: null,
   vencimiento: null,
   numeroSerie: "",
   numeroPedido: "",
   numeroSeguimiento: "",
   precioPorCantidad: "",
};
