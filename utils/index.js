import axios from "axios";
import { API_BASE_URL } from "../config/index.ts";

export const saveDE = async (data, token) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/de`, data, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data;
   } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
   }
};
