export function formatNumber(value) {
   if (value === null || value === undefined || isNaN(value)) {
      return "";
   }

   const number = parseInt(value);
   return number.toLocaleString("es-AR");
}
