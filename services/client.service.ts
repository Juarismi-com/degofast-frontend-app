import axios from "axios";
import { useConfig } from "../config";

const { DEGOFAST_RUCPY_API } = useConfig();

/**
 * Retorna un cliente por ruc, desde el servicio degofast-rucpy
 * @param ruc
 * @returns
 */
export const getClientByRuc = async (ruc: string) => {
   try {
      const response = await axios.get(
         `${DEGOFAST_RUCPY_API}/contributor/search/${ruc}`,
      );
      return response.data;
   } catch (error) {
      console.error("getContributor():", error);
      throw error;
   }
};
