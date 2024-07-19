export function formatNumber(value) {
   const number = parseInt(value);
   return number.toLocaleString("es-PY");
}

export const formatPriceNumber = (price, geo = "es-PY") => {
   console.log(price);

   const priceFormat = new Intl.NumberFormat("es-PY", {
      style: "currency",
      currency: "PYG",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
   }).format(parseFloat(price.toString()));

   console.log(priceFormat);
   console.log("-------");
   return priceFormat;
};

/**
 * @todo validate number of invoice, i.e 000001
 * @param numero
 */
export const getInvoiceNumber = (numero) => {
   let val = numero.toString();
   const ceroLength = 7 - val.length;

   for (let i = 0; i < ceroLength; i++) {
      val = "0" + val;
   }

   return val;
};

export const getEstablecimientoNumber = (numero) => {
   let val = numero.toString();
   const ceroLength = 3 - val.length;

   for (let i = 0; i < ceroLength; i++) {
      val = "0" + val;
   }

   return val;
};

/**
 * @todo move this in a helper
 */
export const getRandomNumber = () => {
   const min = 100000000;
   const max = 999999999;

   const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
   return randomNumber;
};

export function formatDateTime(dateTimeString) {
   if (!dateTimeString) {
      return "";
   }
   let formattedString = dateTimeString.replace(".000Z", "");
   formattedString = formattedString.replace("T", " ");
   return formattedString;
}
