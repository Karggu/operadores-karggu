import axios from "axios";
import { INTEGRATIONS_API } from "../routes/paths.routes";

export default async function registMilleage(data){

    try {
        const response = await axios.put(`${INTEGRATIONS_API}/routes/milleage/`,data)
        return response.data
    } catch (error) {
        return error
    }
}