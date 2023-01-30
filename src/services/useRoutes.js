import axios from "axios";
import { INTEGRATIONS_API } from "../routes/paths.routes";

export default async function findRoute(data){

    try {
        const response = await axios.post(`${INTEGRATIONS_API}/routes/find`,data)
        return response.data
    } catch (error) {
        return error
    }
}