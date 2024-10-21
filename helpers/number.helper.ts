export const formatNumber = (price: number | string, geo = "es-PY") => {
   const priceFormat = new Intl.NumberFormat("es-PY", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
   }).format(parseFloat(price.toString()));
   return priceFormat;
};

export const formatPriceNumber = (price: number, geo = "es-PY") => {
   if (price) {
      const priceFormat = new Intl.NumberFormat(geo, {
         style: "currency",
         currency: "PYG",
         minimumFractionDigits: 0,
         maximumFractionDigits: 0,
      }).format(parseFloat(price.toString()));
      return priceFormat;
   }

   return "--";
};

export const formatPriceNumberNoPYG = (price: number, geo = "en-PY") => {
   if (price) {
      const priceFormat = new Intl.NumberFormat(geo, {
         style: "currency",
         currency: "USD",
         minimumFractionDigits: 0,
         maximumFractionDigits: 2,
      }).format(parseFloat(price.toString()));
      return priceFormat;
   }

   return "--";
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

/**
 * Calcula el IVA dependiendo del valor 0, 5, 10
 * @param item
 * @returns
 */
export const calculateIVA = (item: any) => {
   let result = 0;
   if (item?.iva === 5) {
      result = (item.precioUnitario * item.cantidad) / 21;
      return formatPriceNumber(result);
   } else if (item?.iva === 10) {
      result = (item.precioUnitario * item.cantidad) / 11;
      return formatPriceNumber(result);
   }
   return result;
};

export const isValidCurrency = (currency: string) => {
   const validCurrencies = ["PYG", "Gs.", "GS", "GS."];
   return validCurrencies.includes(currency);
};
