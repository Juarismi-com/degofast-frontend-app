import axios from "axios";
import { useConfig } from "../config";

const { API_URL, DEGOFAST_RUCPY_API } = useConfig();

export const getClientByRuc = async (ruc) => {
   try {
      console.log(useConfig());
      console.log("ruc api" + DEGOFAST_RUCPY_API);
      const response = await axios.get(
         `${DEGOFAST_RUCPY_API}/contributor/search?q=${ruc}`,
      );
      return response.data;
   } catch (error) {
      console.error("getContributor():", error);
      throw error;
   }
};

export const saveDE = async (data) => {
   try {
      const response = await axios.post(`${API_URL}/de`, data);
      return response.data;
   } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
   }
};

export const saveLotes = async (data, token) => {
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

export const getLoteByLoteResponseId = async (loteResponseId) => {
   try {
      const response = await axios.get(`${API_URL}/lotes/${loteResponseId}`);
      return response.data;
   } catch (error) {
      console.error("getLoteByLoteResponseId():", error);
      throw error;
   }
};

export const getContributor = async (contributorId) => {
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
