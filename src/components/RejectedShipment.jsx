import { useEffect, useState } from "react"
import stateShipment from "../hooks/stateShipment";
import updateOrder from "../hooks/updateOrder";
import ImgError from '../img/cerrar.png'

export default function Rejectedshipment({shipment_id, reject}){

    const [comment, setComment] = useState('')
    const [error, setError] = useState(false)
    
    const handleRejectShipment = async () => {
        console.log(comment);
        if(comment.length< 5){
            return setError(!error)
        }
        const data = {reject_comment: comment}
        const res = await updateOrder(shipment_id, data)
        if(res.success){
            const update_order = await stateShipment(shipment_id, "Rechazado")
            console.log(update_order);
        }
        console.log(res);
    }

    const handleChange = e => {
        setComment(e.target.value)
        setError(false)
    }

    return(
        <>
            <h3 className='font-bold text-center my-4'>Rechazo de un envío</h3>
            <div className='w-11/12 m-auto shadow-xl border-2 border-black-500 p-5'>
                
                {reject?(<div className="flex flex-col items-center">
                    <p className='mb-2 text-red-600 font-medium'>Envío rechazado.</p>
                    <img src={ImgError} alt="icon error" width={50}/>
                </div>):(<>
                    <p className='mb-6'>Envío: {shipment_id}</p>
                <p className='mb-6 text-red-600 font-medium'>Escriba la razón por el que el envío es rechazado.</p>
                <textarea cols="30" rows="10" className='border-2 border-black-700' onChange={handleChange}></textarea>
                {error?<p className="text-red-600 font-bold my-2 text-xs">El mensaje es muy corto, debe tenr un mínimo de 5 caracteres.</p>:null}
                <button className="p-1 mx-1 bg-red-500 font-bold rounded-md text-white" onClick={handleRejectShipment}>Rechazar envío</button></>)}
            </div>
        </>
    )
}