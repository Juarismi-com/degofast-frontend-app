import axios from "axios";
import { useConfig } from "../config";

const { DEGOFAST_SYNC_SQL_API } = useConfig();

/**
 * Retorna un cliente por ruc, desde el servicio degofast-rucpy
 * @param ruc
 * @returns
 */
export const getCountersInvoicesByState = async (ruc: string) => {
   try {
      const response = await axios.get(
         `${DEGOFAST_SYNC_SQL_API}/reports/counters`,
      );
      return response.data;
   } catch (error) {
      console.error("getCountersInvoicesByState():", error);
      throw error;
   }
};

export const getAllContributors = async (ruc: string) => {
   try {
      const response = await axios.get(`${DEGOFAST_SYNC_SQL_API}/contributors`);
      return response.data;
   } catch (error) {
      console.error("getCountersInvoicesByState():", error);
      throw error;
   }
};

/**
 * Retorna un cliente por ruc, desde el servicio degofast-rucpy
 * @param ruc
 * @returns
 */
export const getInvoiceLastByState = async (ruc: string) => {
   try {
      const response = await axios.get(
         `${DEGOFAST_SYNC_SQL_API}/reports/invoices/last`,
      );
      return response.data;
   } catch (error) {
      console.error("getInvoiceLastByState():", error);
      throw error;
   }
};
