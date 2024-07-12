export function formatNumber(value) {
   if (value === null || value === undefined) {
      return "";
   }

   // Remove non-digit characters
   const cleanedValue = value.replace(/\D/g, "");

   // Convert to a number and then back to a formatted string
   const number = parseInt(cleanedValue, 10);
   if (isNaN(number)) {
      return "";
   }
   return number.toLocaleString("es-AR");
}
