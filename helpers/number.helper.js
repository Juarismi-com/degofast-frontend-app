export function formatNumber(value) {
   if (value === null || value === undefined || isNaN(value)) {
      return "";
   }
   const number = parseInt(value);
   return number.toLocaleString("es-AR");
}

export function formatDateTime(dateTimeString) {
   if (!dateTimeString) {
      return "";
   }
   let formattedString = dateTimeString.replace(".000Z", "");
   formattedString = formattedString.replace("T", " ");
   return formattedString;
}
