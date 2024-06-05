import { useConfig } from "../config";
import axios from "axios";

const { API_URL }  = useConfig()

export const create = async (path: string, payload: string) => {
   try {
      const res = await axios.post(`${API_URL}/${path}`, payload);
      return res.data;
   } catch (error) {
      console.error(error);
      return null;
   }
};

export const get = async (path: string, query: string) => {
   try {
      const res = await axios.get(`${API_URL}/${path}`);
      return res.data;
   } catch (error) {
      console.error(error);
      return null;
   }
};
