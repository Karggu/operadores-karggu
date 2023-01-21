import { useState } from "react"
import { useEffect } from "react"
import Cookie from 'universal-cookie'
import NavOptions from "../components/NavOptions"
import useShipmentsFolios from "../hooks/useShipmentsFolios"
import isologokarggu from '../SVG/logoisokarggu.svg'

export default function RouteShipments(){

    const [route, setRoute] = useState({})
    const [vehicle, setVehicle] = useState({})
    const [folios, setFolios] = useState([])
    const [shipments, setShipments] = useState([])

    useEffect( () =>{
        const cookies = new Cookie()
        const route = cookies.get("auth_route")
        setRoute(route)
        setVehicle(route.vehicle)
        console.log(route);
        setFolios(route.folios)

        const GetFolios = async () => {
            const shipments = await useShipmentsFolios(route.folios)
            console.log(shipments.data.response);
            setShipments(shipments.data.response)
            console.log(shipments.data.response[0].stateHistory[0].comment);
        }
        GetFolios()
    },[])

    return(
        <div className="">
            <NavOptions/>
            <div className="m-2 flex flex-col items-center w-fit justify-center">
                <img
                    src={isologokarggu}
                    alt="Img karggu"
                    width={50}
                    height={150}
                />
                <p className="ml-2 text-red-500 font-bold text-xs">Operador</p>
            </div>
            <div className="shadow-2xl rounded-xl p-5 m-5">
                <h2 className="font-bold text-center mb-5">Ruta: {route.route}</h2>
                <p><span className="text-red-500 font-medium">Operador:</span> {route.operator}</p>
                <p><span className="text-red-500 font-medium">Vehículo:</span> {vehicle.model}</p>
                <p><span className="text-red-500 font-medium">Placas:</span> {vehicle.plates}</p>
                <hr className="my-5 bg-red-500 h-1 rounded-full"/>
                <div>
                    <p className="text-red-500 font-medium">Envíos a entregar:</p>
                    <ul>
                        {shipments.map( (shipment, i) => (
                            <li key={i} className={`text-white p-2 my-4 rounded-md shadow-lg ${shipment.stateHistory[0].comment === 'Cargado al camion'? 'bg-green-500': 'bg-red-400'}`}>{i+1}. {shipment._id}  {shipment.stateHistory[0].comment === 'Cargado al camion' ? 'Registrado' : '(Sin registrar)'} </li>
                        ))}
                    </ul>
                </div>
                <button className="mt-5 p-2 text-white font-bold bg-gray-400 rounded-lg hover:bg-white hover:text-green-600 shadow-lg" disabled>Iniciar ruta</button>
            </div>
        </div>
    )
}