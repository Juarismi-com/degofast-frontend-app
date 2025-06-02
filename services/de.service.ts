import { useConfig } from "../config";
import axios from "axios";
import { create } from "./http.service.js";

const { API_URL } = useConfig();

/**
 * Guarda un documento electronico, pero aun no lo presenta
 * @param data
 * @returns
 */
export const saveDE = async (data: any) => {
   try {
      const response = await create("de", data);
      return response;
   } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
   }
};

/**
 * Guarda un documento electronico, pero aun no lo presenta
 * @param data
 * @returns
 */
export const createDEAsync = async (data: any) => {
   try {
      const response = await create("de/async", data);
      return response;
   } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
   }
};

/**
 * Actualiza el estado de un documento electronico
 * @param id
 * @param data
 * @returns
 */
export const editDE = async (id: string, data: any) => {
   try {
      const response = await axios.put(`${API_URL}/de/${id}`, data);
      return response.data;
   } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
   }
};

/**
 * Retorna un Documento electronico por ID
 * @param deId
 * @returns
 */
export const getDesById = async (deId: string) => {
   try {
      const response = await axios.get(`${API_URL}/de/${deId}`);
      return response.data;
   } catch (error) {
      console.error("Error getting DES by ID:", error);
      throw error;
   }
};
