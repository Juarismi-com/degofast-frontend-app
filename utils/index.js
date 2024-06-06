import axios from "axios";
import { useConfig } from "../config";

const { API_URL } = useConfig();

export const saveDE = async (data) => {
   try {
      const response = await axios.post(`${API_URL}/de`, data);
      return response.data;
   } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
   }
};

export const saveLotes = async (data) => {
   try {
      const response = await axios.post(`${API_URL}/lotes`, data);
      return response.data;
   } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
   }
};

export const getDesById = async (id) => {
   try {
      const response = await axios.get(`${API_URL}/de/${id}`);
      return response.data;
   } catch (error) {
      console.error("Error getting DES by ID:", error);
      throw error;
   }
};
