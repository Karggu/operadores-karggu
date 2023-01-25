import axios from "axios";
import { NATIONALS_API } from "../routes/paths.routes";

export default async function useFindShipment(id){

    try {
        const response = await axios.get(`${NATIONALS_API}/orders/order/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}