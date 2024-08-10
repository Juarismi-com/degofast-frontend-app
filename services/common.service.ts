import axios from "axios";
import { useConfig } from "../config";

const { DEGOFAST_RUCPY_API } = useConfig();

export const getDeparments = async () => {
   try {
      const response = await axios.get(`${DEGOFAST_RUCPY_API}/departaments`);
      return response.data;
   } catch (error) {
      console.error("getDeparments():", error);
      throw error;
   }
};

export const getCitiesByDeparment = async (deparmentId: number) => {
   try {
      const response = await axios.get(
         `${DEGOFAST_RUCPY_API}/departaments/${deparmentId}/cities`,
      );
      return response.data;
   } catch (error) {
      console.error("getCitiesByDeparment():", error);
      throw error;
   }
};
