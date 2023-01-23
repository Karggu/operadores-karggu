import axios from "axios";
import { NATIONALS_API, INTEGRATIONS_API } from "../routes/paths.routes";

export default async function useShipmentsFolios(data, type){

    try {
        let url = '';
        if(type === 'shipment'){
            url = `${INTEGRATIONS_API}/routes/folios`
        }
        if(type === 'pickup'){
            url = `${NATIONALS_API}/pickups/getAll`
        }
        const response = await axios.post(url,data)
        return response.data
    } catch (error) {
        return error
    }
}