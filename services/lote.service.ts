import axios from "axios";
import { useConfig } from "../config";

const { API_URL } = useConfig();

/**
 * Retorna un lote, por loteresponseId
 * @param loteResponseId 
 * @returns 
 */
export const getLoteByLoteResponseId = async (loteResponseId : string) => {
   try {
      const response = await axios.get(`${API_URL}/lotes/${loteResponseId}`);
      return response.data;
   } catch (error) {
      console.error("getLoteByLoteResponseId():", error);
      throw error;
   }
};


/**
 * Guarda un lote, compuesto de DEs
 * @param data 
 * @returns 
 */
export const saveLotes = async (data: any) => {
   try {
      const response = await axios.post(`${API_URL}/lotes`, data);
      return response.data;
   } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
   }
};