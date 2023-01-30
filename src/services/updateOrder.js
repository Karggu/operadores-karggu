import axios from "axios";
import { NATIONALS_API } from "../routes/paths.routes";

export default async function updateOrder(id, data){

    try {
        const response = await axios.put(`${NATIONALS_API}/orders/${id}`,data)
        return response.data
    } catch (error) {
        return error
    }
}