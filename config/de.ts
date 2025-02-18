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
   descripcion: "",
   observacion: "",
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
      credito: {
         tipo: 1,
         plazo: "",
         cuotas: 0,
      },
   },
   cliente: {
      contribuyente: false,
      razonSocial: "",
      ruc: "",
      tipoContribuyente: 1,
      tipoOperacion: 2,
      documentoTipo: 1,
      documentoNumero: "",
      email: "",
      telefono: "",
      direccion: "",
      numeroCasa: "0",
      departamento: 1,
      departamentoDescripcion: "CAPITAL",
      ciudad: 1,
      ciudadDescripcion: "ASUNCION",
      pais: "PRY",
   },
   items: [],
   notaCreditoDebito: {
      motivo: 1,
   },
   documentoAsociado: {
      formato: 1,
      punto: 1,
      numero: "",
      establecimiento: 1,
      cdc: "",
      tipo: 1,
      timbrado: "",
      fecha: moment().format("YYYY-MM-DDTHH:mm"),
   },
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

export const dePDF = {
   fecha: new Date().toLocaleDateString(),
   cliente: {
      nombre: "",
      direccion: "",
      telefono: "",
      email: "",
   },
   emisor: {
      nombre: "",
      direccion: " ",
      telefono: "",
      email: "",
      timbrado: "",
      logo: "",
   },
   items: [],
   total: 0,
   totalEnLetas: "",
};

export const validateDeCondition = (de: any) => {
   try {
      const { fecha, puntoExpedicion, establecimiento } = de;

      if (!fecha) throw "fecha es requerido";
      if (!establecimiento) throw "establecimiento es requerido";
      if (!puntoExpedicion) throw "puntoExpedicion no esta definido";

      const { condicion } = de;
      if (condicion?.tipo == 2) {
         const { credito } = condicion;

         if (credito?.tipo == 1 && isEmpty(credito.plazo))
            throw "condicion.credito.tipo.plazo debe asignar algun valor";

         if (credito?.tipo == 2) {
            if (isEmpty(credito.cuotas) || credito.cuotas == 0)
               throw "condicion.credito.cuotas debe estar asignado y mayor a cero";
         }
      }

      return true;
   } catch (error) {
      throw error;
   }
};

export const validateDeCliente = (de: any) => {
   try {
      const { cliente } = de;

      if (!cliente.razonSocial) throw "cliente.nombre es requerido";

      if (cliente.contribuyente) {
         if (!cliente.ruc) throw "cliente.ruc es requerido";
         if (!cliente.telefono) throw "cliente.telefono es requerido";
         if (!cliente.email) throw "cliente.email es requerido";
      } else {
         if (!cliente.documentoNumero)
            throw "cliente.documentoNumero es requerido";

         if (!cliente.documentoTipo) throw "cliente.documentoTipo es requerido";

         if (
            cliente.documentoTipo == 6 &&
            cliente.documentoNumero.toString().toLowerCase().indexOf("of") > -1
         )
            throw "cliente.documentoTipo No debe contener of";
      }

      return true;
   } catch (error) {
      throw error;
   }
};

export const validateDeItems = (de: any) => {
   try {
      const { items } = de;
      if (items.length == 0) throw "debe asignar items al documento";

      return true;
   } catch (error) {
      throw error;
   }
};

export const validateNotaCreditoDebito = (de: any) => {
   try {
      if (de.tipoDocumento == 5) {
         const { notaCreditoDebito, documentoAsociado } = de;
         if (!notaCreditoDebito?.motivo)
            throw "notaCreditoDebito.motivo es requerido";

         if (!documentoAsociado.formato)
            throw "documentoAsociado.formato es requerido";

         if (!documentoAsociado.timbrado)
            throw "documentoAsociado.timbrado es requerido";

         if (!documentoAsociado.numero)
            throw "documentoAsociado.numero es requerido";

         if (!documentoAsociado.punto)
            throw "documentoAsociado.punto es requerido";

         if (!documentoAsociado.establecimiento)
            throw "documentoAsociado.establecimiento es requerido";

         if (!documentoAsociado.fecha)
            throw "documentoAsociado.fecha es requerido";

         if (!documentoAsociado.tipo)
            throw "documentoAsociado.tipo es requerido";
      }

      return true;
   } catch (error) {
      throw error;
   }
};

/**
 * move this to helper or validator
 * @param de
 * @returns
 */
export const validatorDeForm = (de: any) => {
   try {
      validateDeCondition(de);
      validateDeCliente(de);
      validateDeItems(de);
      validateNotaCreditoDebito(de);

      return true;
   } catch (error) {
      alert(error);

      return false;
   }
};

export const isEmpty = (value: any) => {
   if (value == undefined || value == null || value == "") {
      return true;
   }
   return false;
};
