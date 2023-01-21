import axios from "axios";
import { PATH_API } from "../routes/paths.routes";

export default async function useShipmentsFolios(data){

    try {
        const response = await axios.post(`${PATH_API}/routes/folios`,data)
        console.log(response.data);
        return response.data
    } catch (error) {
        return error
    }
}