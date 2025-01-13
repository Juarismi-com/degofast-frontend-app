import axios from "axios";
import { useConfig } from "../config";

const { DEGOFAST_RUCPY_API } = useConfig();

/**
 * Envía una notificación por correo para un documento electrónico
 * @param {string} cdc - Código único del documento
 * @param {string} email - Dirección de correo electrónico del destinatario
 * @param {string} deId - ID de la factura
 * @returns {Promise<any>} Respuesta del servidor
 */
export const sendEmailNotification = async (
   cdc: string,
   email: string,
   deId: string,
) => {
   try {
      const response = await axios.post(
         `${DEGOFAST_RUCPY_API}/mail-notification/de`,
         {
            cdc,
            email,
            deId,
         },
      );
      return response.data;
   } catch (error) {
      console.error("sendEmailNotification():", error);
      throw error;
   }
};
