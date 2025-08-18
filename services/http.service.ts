import { useConfig } from "../config";
import axios from "axios";

const { API_URL } = useConfig();

export const create = async (path: string, payload: any) => {
   try {
      const res = await axios.post(`${API_URL}/${path}`, payload);
      return res.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const update = async (path: string, payload: any) => {
   try {
      const res = await axios.patch(`${API_URL}/${path}`, payload);
      return res.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const replace = async (path: string, payload: any) => {
   try {
      const res = await axios.put(`${API_URL}/${path}`, payload);
      return res.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const get = async (path: string) => {
   try {
      const res = await axios.get(`${API_URL}/${path}`);
      return res.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const getById = async (path: string, id: string) => {
   try {
      const res = await axios.get(`${API_URL}/${path}/${id}`);
      return res.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};
