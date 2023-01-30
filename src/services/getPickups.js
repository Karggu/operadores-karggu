import axios from "axios";
import { NATIONALS_API } from "../routes/paths.routes";

export default async function getPickups(data){

    try {
        const response = await axios.post(`${NATIONALS_API}/pickups/getAll`, data)
        return response.data
    } catch (error) {
        return error
    }
}