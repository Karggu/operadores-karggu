import { useEffect, useState } from "react"
import useShipmentsFolios from "../hooks/useShipmentsFolios"
import Cookie from 'universal-cookie'
import { useNavigate } from "react-router-dom"

import Close from '../SVG/backward.svg';

export default function RouteRoad(){

    const [shipments, setShipments] = useState([])
    const navigate = useNavigate()

    useEffect(() => {

        const cookies = new Cookie()
        const route = cookies.get("auth_route")

        const GetFolios = async () => {
            const shipments = await useShipmentsFolios(route.folios, route.type)
            if(route.type === 'shipment'){
                setShipments(shipments.data.response)
            }
            if(route.type === 'pickup'){
                // setShipments(shipments.pickupOrders)
            }
        }
        GetFolios()
    },[])

    const handleState = (shipment, status) => {
        navigate(`/route/road/${shipment._id}/${status}`)
    }

    function closePage() {
        navigate('/route');
    }

    return(
        <div>
            <div className="flex justify-center h-14">
                <button onClick={closePage}><img src={Close} alt="close button" className="w-7 h-7 absolute left-5 top-5"/></button>
                <h3 className="text-center font-bold mt-5 text-lg ">Entrega de envíos</h3>
            </div>
            <div className="w-11/12 border-2 m-auto mt-3 rounded-md shadow-xl border-black-500 p-2">
                {shipments.map(shipment => (
                    <div key={shipment._id} className="bg-blue-500 p-3 rounded-md shadow-xl text-white">
                        <p className="font-bold">Envío:</p>
                        <p className="text-slate-100">{shipment._id}</p>
                        <p className="font-bold mt-3">Dirección: </p>
                        <p className="text-slate-100">{shipment.places.delivery.address.municipality}, {shipment.places.delivery.address.colony}, {shipment.places.delivery.address.streetAndNumber}, #{shipment.places.delivery.address.numExterior}, {shipment.places.delivery.address.numInterior == null ? `#${shipment.places.delivery.address.numInterior}` : ''} C.P. {shipment.places.delivery.address.zipCode}</p>
                        <hr className="my-2"/>
                        <div className="flex mt-3">
                            <button className="p-1 bg-green-500 font-bold rounded-md w-1/3" onClick={() => handleState(shipment, 'entregar')}>Entregar</button>
                            <button className="p-1 mx-3 bg-red-500 font-bold rounded-md w-1/3" onClick={() => handleState(shipment, 'rechazar')}>Rechazar</button>
                            <button className="p-1 mx-1 bg-yellow-500 font-bold rounded-md w-1/3" onClick={() => handleState(shipment, 'intento')}>Intento</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-11/12 h-14 border-2 m-auto mt-2 rounded-md shadow-xl border-black-500 pt-[.4rem] pl-2">
                <button className="p-2 h-10 bg-green-500 text-white font-bold rounded-md shadow-xl">Finalizar ruta</button>
            </div>
        </div>
    )
}