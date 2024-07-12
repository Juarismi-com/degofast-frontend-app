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

   // Eliminar el ".000Z" del final
   let formattedString = dateTimeString.replace(".000Z", "");

   // Reemplazar la "T" con un espacio
   formattedString = formattedString.replace("T", " ");

   return formattedString;
}
