import moment from "moment";

export const deReceiptData = {
   numero: "",
   fecha: moment().format("YYYY-MM-DDTHH:mm"),
   recibidoDe: "",
   monto: 0,
   montoLetras: "",
   concepto: "",
};


export const validateRecibo = (recibo: any) => {
   try {

      if (!recibo.recibidoDe) throw "recibo.recibidoDe es requerido";
      if (!recibo.monto) throw "recibo.recibidoDe es requerido";
      if (!recibo.montoLetras) throw "recibo.montoLetras es requerido";
      if (!recibo.concepto) throw "recibo.concepto es requerido";

      return true;
   } catch (error) {
      throw error;
   }
};