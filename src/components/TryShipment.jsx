import { useState } from "react";
import stateShipment from "../hooks/stateShipment";
import registTryOrder from "../hooks/updateRegistTryOrder";
import ImgAdvert from '../img/advertencia.png'

export default function TryShipment ({shipment_id, intent}){

    const [tryOrder, setTryOrder] = useState('Dirección incorrecta')

    const handleChangeSelect = e => {
        console.log(e.target.value);
        setTryOrder(e.target.value)
    }

    const handleRegistTry = async () => {
        const res = await registTryOrder(shipment_id, {comment: tryOrder})
        const state = await stateShipment(shipment_id, "Intento Entrega")
        console.log(res);
        console.log(state);
    }

    return(
        <>
            <h3 className='font-bold text-center my-4'>Intento de envío</h3>
            <div className='w-11/12 m-auto shadow-xl border-2 border-black-500 p-5'>
                <p className='mb-6'>Envío: {shipment_id}</p>
                {intent?(
                <div className="flex flex-col items-center">
                    <p className='mb-2 text-yellow-600 font-medium'>Intento de envío registrado.</p>
                    <img src={ImgAdvert} alt="warning icon" width={50}/>
                </div>
                ):(
                    <><p className='mb-6 text-yellow-600 font-medium'>Seleccione la opción por la que el envío no pudo ser entregado a su destino.</p>
                    <select onChange={handleChangeSelect}>
                        <option value="Dirección incorrecta">Dirección incorrecta</option>
                        <option value="Dirección insuficiente">Dirección insuficiente</option>
                        <option value="Destinatario ausente">Destinatario ausente</option>
                        <option value="Otro motivo.">Etc.</option>
                    </select>
                    <button className="p-1 mx-1 bg-yellow-500 font-bold rounded-md text-white" onClick={handleRegistTry}>Registrar intento</button></>
                )}
            </div>
            </>
    )
}