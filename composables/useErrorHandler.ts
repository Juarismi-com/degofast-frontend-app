import { useToast } from "vue-toast-notification";

const DEFAULT_ERROR_MESSAGE = "Ocurrió un error. Por favor, intenta de nuevo.";

export const useErrorHandler = () => {
   const toast = useToast();

   const asString = (value: any) => (typeof value === "string" && value ? value : null);

   const getErrorMessage = (error: any, fallbackMessage = DEFAULT_ERROR_MESSAGE) => {
      return (
         asString(error?.response?.data?.message) ||
         asString(error?.response?.data?.error) ||
         asString(error?.data?.message) ||
         asString(error?.data?.error) ||
         asString(error?.message) ||
         asString(error) ||
         fallbackMessage
      );
   };

   const handleError = (error: any, fallbackMessage = DEFAULT_ERROR_MESSAGE) => {
      console.error(error);
      const message = getErrorMessage(error, fallbackMessage);
      toast.error(message);
      return message;
   };

   return { handleError, getErrorMessage };
};
