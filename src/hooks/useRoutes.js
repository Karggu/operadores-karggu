import axios from "axios";
import { PATH_API } from "../routes/paths.routes";

export default async function usefindRoute(data){

    try {
        const response = await axios.post(`${PATH_API}/routes/find`,data)
        return response.data
    } catch (error) {
        return error
    }
}