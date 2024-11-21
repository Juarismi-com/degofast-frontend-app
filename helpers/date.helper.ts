import moment from "moment";

export function formatDateHours(value: string) {
   let fecha = moment(value).format("YYYY-MM-DDTHH:mm:ss");
   return fecha;
}

export function formatDate(value: string) {
   let fecha = moment(value).format("YYYY-MM-DD");
   return fecha;
}
