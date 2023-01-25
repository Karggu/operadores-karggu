import axios from "axios";
import { NATIONALS_API } from "../routes/paths.routes";

export default async function registTryOrder(id, data){

    try {
        const response = await axios.put(`${NATIONALS_API}/orders/try/${id}`,data)
        return response.data
    } catch (error) {
        return error
    }
}