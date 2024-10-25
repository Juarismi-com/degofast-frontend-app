import moment from "moment";

export const deReceiptData = {
   numero: "",
   fecha: moment().format("YYYY-MM-DDTHH:mm"),
   recibidoDe: "",
   ruc: "",
   monto: 0,
   montoLetras: "",
   concepto: "",
   moneda: "PYG",
   formaPago: "Efectivo",
   banco: "",
   nroBanco: "",
   ci: "",
};

export const validateRecibo = (recibo: any) => {
   try {
      if (!recibo.numero) throw "El campo numero es requerido";
      if (!recibo.recibidoDe) throw "El campo recibidoDe es requerido";
      if (!recibo.monto || isNaN(Number(recibo.monto)))
         throw "El campo 'monto' es requerido y debe ser numérico";
      if (!recibo.moneda) throw "Moneda es requerido";
      if (!recibo.montoLetras) throw "El campo montoLetras es requerido";
      if (typeof recibo.montoLetras === "number")
         throw "El campo 'montoLetras' no debe ser numérico";
      if (!recibo.numero) throw "El campo numero es requerido";
      if (!recibo.recibidoDe) throw "El campo recibidoDe es requerido";
      if (!recibo.monto || isNaN(Number(recibo.monto)))
         throw "El campo 'monto' es requerido y debe ser numérico";
      if (!recibo.moneda) throw "Moneda es requerido";
      if (!recibo.montoLetras) throw "El campo montoLetras es requerido";
      if (typeof recibo.montoLetras === "number")
         throw "El campo 'montoLetras' no debe ser numérico";
      if (/\d/.test(recibo.montoLetras)) {
         throw "El campo montoLetras no debe contener números.";
      }
      if (!recibo.concepto) throw "El campo concepto es requerido";

      // Validación adicional para Cheque o Transferencia
      if (
         recibo.formaPago === "Cheque" ||
         recibo.formaPago === "Transferencia"
      ) {
         if (!recibo.banco)
            throw "El campo 'banco' es requerido para pagos con Cheque o Transferencia";
         if (!recibo.nroBanco)
            throw "El campo 'N° Banco' es requerido para pagos con Cheque o Transferencia";
      }

      return true;
   } catch (error) {
      throw error;
   }
};
