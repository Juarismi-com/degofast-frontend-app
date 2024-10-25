import { get } from "./http.service.js";
import { useConfig } from "../config";

const { API_URL } = useConfig();

/**
 * Retorna todos los reportes por contribuyente
 */
export const getReports = async (contributorId: string) => {
   try {
      const response = await get(`/de/${contributorId}/report`);
      return response.data;
   } catch (error) {
      console.error("Error getting Reports:", error);
      throw error;
   }
};
