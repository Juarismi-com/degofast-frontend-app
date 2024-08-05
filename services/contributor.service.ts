import axios from "axios";
import { useConfig } from "../config";

const { API_URL } = useConfig();

/**
 * Retorna un contribuyente por object id
 * @param contributorId 
 * @returns 
 */
export const getContributor = async (contributorId: string) => {
   try {
      const response = await axios.get(
         `${API_URL}/contributor-emitter/${contributorId}`,
      );
      return response.data;
   } catch (error) {
      console.error("getContributor():", error);
      throw error;
   }
};


