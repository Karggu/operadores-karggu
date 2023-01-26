import axios from "axios";
import { INTEGRATIONS_API } from "../routes/paths.routes";

export default async function loginRoute(data){

    try {
        const response = await axios.post(`${INTEGRATIONS_API}/routes/login`,data)
        return response.data
    } catch (error) {
        return error
    }
}