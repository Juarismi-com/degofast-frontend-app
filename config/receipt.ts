import moment from "moment";

export const deReceiptData = {
   numero: "",
   fecha: moment().format("YYYY-MM-DDTHH:mm"),
   emisor : {
      ruc: "", 
      razonSocial: ""
   },
   receptor: {
      ruc: "", 
      razonSocial: ""
   },
   cantidad: "",
   concepto: ""
};