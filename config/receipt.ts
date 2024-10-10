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

      if (!recibo.numero) throw "recibo.numero es requerido";
      if (!recibo.recibidoDe) throw "recibo.recibidoDe es requerido";
      if (!recibo.monto || isNaN(Number(recibo.monto))) throw "El campo 'monto' es requerido y debe ser numérico";
      if (!recibo.montoLetras) throw "recibo.montoLetras es requerido";
      if (!recibo.concepto) throw "recibo.concepto es requerido";

      return true;
   } catch (error) {
      throw error;
   }
};