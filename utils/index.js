import axios from "axios";
import { useConfig } from "../config";

const { API_URL }  = useConfig()

export const saveDE = async (data, token) => {
   try {
      const response = await axios.post(`${API_URL}/de`, data, {
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
