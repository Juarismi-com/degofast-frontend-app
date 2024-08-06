import axios from "axios";
import { useConfig } from "../config";

const { API_URL }  = useConfig()

/**
 * Retorna el listado de servicios de un contribuyente
 * @param contributorId 
 * @returns 
 */
export const getServicesByContributor = async (contributorId: string) => {
   try {
      const response = await axios.get(
         `${API_URL}/contributor-emitter/${contributorId}/services`,
      );
      return response.data;
   } catch (error) {
      console.error("getServicesByContributor():", error);
      throw error;
   }
};
