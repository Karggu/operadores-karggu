import axios from "axios";
import { NATIONALS_API } from "../routes/paths.routes";

export default async function useUploadImg(img, filUrl){

    try {
        const response = await axios.postForm(`${NATIONALS_API}/upload`,{
            'filUrl': filUrl,
            'file': img
        })
        return response.data
    } catch (error) {
        return error
    }
}