import axios from "axios";
import { INTEGRATIONS_API } from "../routes/paths.routes";

export default async function useInitRoute(id, status){

    try {
        const response = await axios.put(`${INTEGRATIONS_API}/routes/${id}/${status}`)
        return response.data
    } catch (error) {
        return error
    }
}