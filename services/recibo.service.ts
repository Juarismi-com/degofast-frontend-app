import axios from "axios";
import { create } from "./http.service.js";
import { useConfig } from "../config";

const { API_URL } = useConfig()

/**
 * Crea un Recibo
 * @param data 
 * @returns 
 */
export const saveRecibo = async (data: any) => {
   try {
      const response = await create("recibo", data)
      return response;
   } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
   }
};


/**
 * Actualiza el estado de un Recibo
 * @param id
 * @param data 
 * @returns 
 */
export const editRecibo = async (id: string, data: any) => {
   try {
      const response = await axios.put(`${API_URL}/recibo/${id}`, data);
      return response.data;
   } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
   }
};


/**
 * Retorna un Recibo por ID
 * @param deId 
 * @returns 
 */
export const getReciboById = async (reciboId: string) => {
   try {
      const response = await axios.get(`${API_URL}/recibo/${reciboId}`);
      return response.data;
   } catch (error) {
      console.error("Error getting Recibo by ID:", error);
      throw error;
   }
};