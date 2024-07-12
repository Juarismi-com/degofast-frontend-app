export function formatNumber(value) {
   if (value === null || value === undefined || isNaN(value)) {
      return "";
   }

   const number = parseInt(value);
   return number.toLocaleString("es-AR");
}


/**
 * @todo validate number of invoice, i.e 000001
 * @param numero 
 */
export const getInvoiceNumber = (numero) => {
   let val = numero.toString();
   const ceroLength = 7 - val.length 

   for (let i = 0; i < ceroLength; i++) {
      val ='0' + val;
   }
   
   return val;
}

/**
 * @todo move this in a helper
 */
export const getRandomNumber = () => {
   const min = 100000000;
   const max = 999999999;

   const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
   return randomNumber;
}
