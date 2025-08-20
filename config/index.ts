export const APP_NAME = "degofast";
export const APP_LOGO_PATH = "";

export const HOME_PAGE_PATH = "/dashboard";

export const INPUT_CLASS = {
   basic: "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500",
   sm: "block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
};

export const BTN_CLASS = {
   lila_basic:
      "text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800",
   gray_basic:
      "rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75",
};

export const TIPO_DOCUMENT_LIST = [
   {
      path: "/dashboard/",
      title: "Inicio",
      svgIcon:
         "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
   },
   {
      title: "Facturacion Electronica",
      tipoDocumento: 1,
      path: "/documentos-electronicos/tipos/1",
      svgIcon:
         "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
   },
   /*{
      title: "Autofactura",
      tipoDocumento: 4,
      path: "/documentos-electronicos/tipos/4",
      svgIcon:
         "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
   },*/
   {
      title: "Nota de Crédito",
      tipoDocumento: 5,
      path: "/documentos-electronicos/tipos/5",
      svgIcon:
         "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
   },
   /*{
      title: "Nota de Débito",
      tipoDocumento: 6,
      path: "/documentos-electronicos/tipos/6",
      svgIcon:
         "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
   },*/
   // {
   //    title: "Nota de Remisión",
   //    tipoDocumento: 7,
   //    path: "/documentos-electronicos/tipos/7",
   //    svgIcon:
   //       "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
   // },
   // {
   //    title: "Recibo",
   //    tipoDocumento: 50,
   //    path: "/documentos-electronicos/tipos/50",
   //    svgIcon:
   //       "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
   // },
];

export const useConfig = () => {
   const config = useRuntimeConfig().public;

   return {
      API_URL: config.API_URL,
      APP_ENV: config.APP_ENV,
      DEGOFAST_RUCPY_API: config.DEGOFAST_RUCPY_API,
      DE_SUBMIT_FORM: config.DE_SUBMIT_FORM,
      DEGOFAST_SYNC_SQL_API: config.DEGOFAST_SYNC_SQL_API,
   };
};

export default {
   useConfig,
   APP_NAME,
   APP_LOGO_PATH,
   TIPO_DOCUMENT_LIST,
   HOME_PAGE_PATH,
   INPUT_CLASS,
};
