import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import useFindShipment from '../hooks/useFinishShipment';
import stateShipment from '../hooks/stateShipment';
import useUploadImg from '../hooks/useUploadImg';
import ImgError from '../img/cerrar.png'
import { useNavigate } from "react-router-dom"
import updateOrder from '../hooks/updateOrder';
import DeliveredShipment from '../components/DeliveredShipment';
import Rejectedshipment from '../components/RejectedShipment';
import TryShipment from '../components/TryShipment';

export default function Shipment(){

    const navigate = useNavigate()
    const {shipment_id, status} = useParams()
    const [errorImg, setErrorImg] = useState(false)
    const [uploadImg, setUploadImg] = useState(false)
    const [finish, setFinish] = useState(false)
    const [reject, setReject] = useState(false)
    const [intent, setTryOrder] = useState(false)

    useEffect(() => {   
        const GetShipment = async ()=> {
            const res = await useFindShipment(shipment_id)
            if(!res.success){
                console.log('error');
            }
            if(res.response.evidence_img){
                setUploadImg(true)
            }else{
                setUploadImg(false)
            }
            if(res.response.stateHistory.find( s => s.comment === "Entregado")){
                setFinish(true)
            }
            if(res.response.stateHistory.find( s => s.comment === "Rechazado")){
                setReject(true)
            }
            if(res.response.stateHistory.find( s => s.comment === "Intento Entrega")){
                setTryOrder(true)
            }
        }
        GetShipment()
    },[shipment_id])

    const HandleImgUpload = async e => {
        setErrorImg(!errorImg)
        console.log(e.target.files[0]);
        const file = e.target.files[0]
        if(file.type !== 'image/png' || file.type !== 'image/jpeg'){
            setErrorImg(!errorImg)
        }
        const file_url = `shipments-evidence/${shipment_id}.png`
        const upload = await useUploadImg(file, file_url)
        console.log(upload);
        if(upload.success){
            const data = {evidence_img: upload.location}
            const success_upload = await updateOrder(shipment_id, data)
            console.log(success_upload);
            setUploadImg(true)
        }else{
            setUploadImg(false)
        }
    }

    const handleFinishShipment = async () => {
        const res = await stateShipment(shipment_id, "Entregado")
        if(res){
            setFinish(true)
        }
    }

    function closePage() {
        navigate("/route/road");
    }

    return(
        <div>
            {status === 'entregar'?(
                <DeliveredShipment shipment_id={shipment_id} finish={finish} uploadImg={uploadImg} handleFinishShipment={handleFinishShipment} HandleImgUpload={HandleImgUpload} ImgError={ImgError} setErrorImg={setErrorImg} closePage={closePage}/>
            ):null}
            {status === 'rechazar'?(
                <Rejectedshipment shipment_id={shipment_id} reject={reject} closePage={closePage}/>
            ):null}
            {status === 'intento'?(
                <TryShipment shipment_id={shipment_id} intent={intent} closePage={closePage}/>
            ): null}
        </div>
    )
}