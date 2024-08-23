export const formatNumber = (price: number | string, geo = "es-PY") => {
   const priceFormat = new Intl.NumberFormat("es-PY", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
   }).format(parseFloat(price.toString()));
   return priceFormat;
};

export const formatPriceNumber = (price: string | number, geo = "es-PY") => {
   return price;
   const priceFormat = new Intl.NumberFormat(geo, {
      style: "currency",
      currency: "PYG",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
   }).format(parseFloat(price.toString()));
   return priceFormat;
};

export const getPuntoExpedicionNumberCode = (numero: number | string) => {
   return addPrefixCero(numero, 3);
};

export const getDeNumberCode = (numero: number | string) => {
   return addPrefixCero(numero, 7);
};

export const getEstablecimientoNumberCode = (numero: number | string) => {
   return addPrefixCero(numero, 3);
};

/**
 * Agrega cantidad de cero al numero como prefijo hasta que tenga
 * maxLength string
 *
 * @example
 *    numero: 10
 *    maxlength: 5
 *      2 = el length que se calcula del numero
 *      5 = el length total que debe tener el string
 *      00010 = el valor que debe retornar la funcion con 000 prefijos
 *
 * @param {*} numero
 * @param {*} maxLength
 * @returns
 */
export const addPrefixCero = (numero: number | string, maxLength: number) => {
   let val = numero.toString();
   const ceroLength = maxLength - val.length;

   for (let i = 0; i < ceroLength; i++) {
      val = "0" + val;
   }

   return val;
};

/**
 * Elimina los prefijos cero
 *
 * @example
 *    value: "00010" return 10
 * @param {*} value
 * @returns
 */
export const removePrefixCero = (value: string) => {
   return parseInt(value.toString());
};

/**
 * Genera un numero randon de 9 digitos/caracteres
 * @returns
 */
export const getRandomNumberForDe = () => {
   const min = 100000000;
   const max = 999999999;

   const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
   return randomNumber;
};

export function formatDateTime(dateTimeString: string) {
   if (!dateTimeString) {
      return "";
   }
   let formattedString = dateTimeString.replace(".000Z", "");
   formattedString = formattedString.replace("T", " ");
   return formattedString;
}
