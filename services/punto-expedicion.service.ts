
import axios from "axios";
import { useConfig } from "../config";
import { objectToQueryParams, queryParamsToObject } from "~/helpers/url.helper";

const { API_URL } = useConfig();

/**
 * Retorna un cliente por ruc, desde el servicio degofast-rucpy
 * @param ruc 
 * @returns 
 */
export const getPuntoExpedicionByFilters = async (filters: any) => {
   try {      
      const queryParams = objectToQueryParams(filters);
     
      const response = await axios.get(
         `${API_URL}/punto-expedicion?${queryParams}`,
      );
      return response.data;
   } catch (error) {
      console.error("getContributor():", error);
      throw error;
   }
};
