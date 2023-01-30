import axios from "axios";
import { NATIONALS_API } from "../routes/paths.routes";

export default async function statusPickup(id,data){

    try {
        const response = await axios.put(`${NATIONALS_API}/pickups/status/${id}`, data)
        return response.data
    } catch (error) {
        return error
    }
}