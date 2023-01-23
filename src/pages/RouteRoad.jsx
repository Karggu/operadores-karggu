import { useEffect, useState } from "react"
import useShipmentsFolios from "../hooks/useShipmentsFolios"
import Cookie from 'universal-cookie'
import { useNavigate } from "react-router-dom"

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

    return(
        <div>
            <h3 className="text-center font-bold mt-5 text-lg">Entrga de envíos</h3>
            <div className="w-11/12 border-2 m-auto mt-3 rounded-md shadow-xl border-black-500 p-5">
                {shipments.map(shipment => (
                    <div key={shipment._id} className="bg-blue-500 p-3 rounded-md shadow-xl text-white">
                        <p><span className="font-bold">Envío:</span> {shipment._id}</p>
                        <p><span className="font-bold">Dirección:</span> {shipment.places.delivery.address.municipality} {shipment.places.delivery.address.colony} {shipment.places.delivery.address.streetAndNumber} {shipment.places.delivery.address.numExterior} {shipment.places.delivery.address.numInterior} {shipment.places.delivery.address.zipCode}</p>
                        <hr className="my-2"/>
                        <button className="p-1 mx-1 bg-green-500 font-bold rounded-md" onClick={() => handleState(shipment, 'entregar')}>Enregar</button>
                        <button className="p-1 mx-1 bg-red-500 font-bold rounded-md" onClick={() => handleState(shipment, 'rechazar')}>Rechazar</button>
                        <button className="p-1 mx-1 bg-yellow-500 font-bold rounded-md" onClick={() => handleState(shipment, 'intento')}>Intento</button>
                    </div>
                ))}
            </div>
            <div className="w-11/12 border-2 m-auto mt-3 rounded-md shadow-xl border-black-500 p-5">
                <button className="p-3 py-2 bg-green-400 text-white font-bold rounded-md shadow-xl">Finalizar ruta</button>
            </div>
        </div>
    )
}