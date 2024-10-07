import moment from "moment";

export const deReceiptData = {
   numero: "7",
   fecha: moment().format("YYYY-MM-DDTHH:mm"),
   recibidoDe: "TEST",
   monto: 200000,
   montoLetras: "Doscientos mil guaranies",
   concepto: "PAGO POR SERVICIO",
   establecimiento: "001",
   puntoExpedicion: "66c647dc2015360404836de6"
};


export const validateRecibo = (recibo: any) => {
   try {

      if (!recibo.recibidoDe) throw "recibo.recibidoDe es requerido";
      if (!recibo.monto) throw "recibo.recibidoDe es requerido";
      if (!recibo.montoLetras) throw "recibo.montoLetras es requerido";
      if (!recibo.concepto) throw "recibo.concepto es requerido";
      if (!recibo.establecimiento) throw "recibo.establecimiento es requerido";
      if (!recibo.puntoExpedicion) throw "recibo.puntoExpedicion es requerido";

      return true;
   } catch (error) {
      throw error;
   }
};