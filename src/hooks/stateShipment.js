import axios from "axios";
import { NATIONALS_API } from "../routes/paths.routes";

export default async function stateShipment(id, status){

    try {
        const response = await axios.post(`${NATIONALS_API}/orders/state`,{orders: [id], status})
        return response.data
    } catch (error) {
        return error
    }
}