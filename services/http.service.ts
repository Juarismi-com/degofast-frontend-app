import { API_BASE_URL } from "../config";
import axios from "axios";
/**
 * Get the services, for this case is static, but we can crear a request to request from api
 * @returns {array}
 */
export const getServices = () => {
   return [
      {
         title: "Agencias",
         icon: "images/Trazado-63.png",
         description:
            "Crea mejores estrategias de marketing digital, planes de medios y reportes de resultados para tus clientes. Muéstrale qué está haciendo su competencia en publicidad online.",
      },
      {
         title: "Medios",
         icon: "images/Grupo-134.png",
         description:
            "Mejora tus argumentos de ventas conociendo en detalle la inversión de tus clientes en otros medios y el alcance que les aporta.us clientes en otros medios y el alcance que les aporta.",
      },
      {
         title: "Marcas",
         icon: "images/Grupo-132.png",
         description:
            "Descubre las ofertas y campañas que tu competencia está promocionando. Recibe alertas cuando tu competencia lanza una nueva campaña de publicidad online.",
      },
      {
         title: "Verificación",
         icon: "images/Trazado-65.png",
         description:
            "Como un agente tercero, transparente y sin conflictos de interés, Admetricks permite a los actores de la industria del marketing digital verificar que sus campañas exhiban en los sitios y formatos pautados.",
      },
   ];
};

export const create = async (path: string, payload: string) => {
   try {
      const res = await axios.post(`${API_BASE_URL}/${path}`, payload);
      return res.data;
   } catch (error) {
      console.error(error);
      return null;
   }
};

export const get = async (path: string, query: string) => {
   try {
      const res = await axios.get(`${API_BASE_URL}/${path}`);
      return res.data;
   } catch (error) {
      console.error(error);
      return null;
   }
};
