import { useState } from "react"
import { useEffect } from "react"
import Cookie from 'universal-cookie'
import NavOptions from "../components/NavOptions"
import UseInitRoute from "../services/initRoute"
import shipmentsFolios from "../services/useShipmentsFolios"
import isologokarggu from '../SVG/logoisokarggu.svg'
import {useNavigate} from 'react-router-dom'
import usefindRoute from "../services/useRoutes"
import registMilleage from "../services/milleageRegist"
import getPickups from "../services/getPickups"

export default function RouteShipments(){

    const [route, setRoute] = useState({})
    const [vehicle, setVehicle] = useState({})
    const [shipments, setShipments] = useState([])
    const [incompleted, setIncompleted] = useState(false)
    const [milleage, setMilleage] = useState({
        regist: false,
        milleage: 0,
        error: false
    })
    const navigate = useNavigate()
    const [loadding, setLoadding] = useState(true)

    useEffect( () =>{
        const cookies = new Cookie()
        const route = cookies.get("auth_route")
        const VeifyInitRoute = async () => {
            const find_route = await usefindRoute({id_route: route._id, plates_vehicle: null})
            const status_init = find_route.data.status.find(s => s.comment === 'Inicio de ruta')
            console.log(status_init.comment);
            if(status_init.comment && route.type === 'shipment'){
                navigate("/route/road")
            }

            if(status_init.comment && route.type === 'pickup'){
                navigate("/route/collection")
            }
        }
        VeifyInitRoute()

        setRoute(route)
        setVehicle(route.vehicle)

        const GetFolios = async () => {
            if(route.type === 'shipment'){
                const shipments = await shipmentsFolios(route.folios, route.type)
                setShipments(shipments.data.response)
            }
            if(route.type === 'pickup'){
                const pickups = await getPickups(route.folios)
                console.log(pickups);
                setShipments(pickups.pickupOrders)
            }
        }
        GetFolios()
        setLoadding(false)
    },[navigate])

    const handleMilleage = async () => {
        setMilleage({...milleage, regist: true})
        const res = await registMilleage({id: route._id,milleague_type: 'start', milleage: milleage.milleage})
        console.log(res);
    }

    const handleInitRoute = async () => {
        console.log(route);
        if(route.type === 'shipment'){
            shipments.forEach( shipment => {
                const ready = shipment.stateHistory.find( state => state.comment === 'Cargado al cami??n')
                if(!ready) setIncompleted(true)
            })
            const states = shipments.map( shipment =>{
                return shipment.stateHistory.find(state => state.comment === 'Cargado al cami??n')
            })
            console.log();
            console.log(states.includes(undefined));
            const inc = states.includes(undefined) 
            if(!inc){
                console.log('ruta completa');
                // if(!milleage.regist){
                //     setMilleage({...milleage, error: true})
                //     return
                // }
                await UseInitRoute(route._id, 'Inicio de ruta')
                navigate("/route/road")
                console.log('ruta completa');
            }
        }

        if(route.type === 'pickup'){
            await UseInitRoute(route._id, 'Inicio de ruta')
            navigate("/route/collection")
        }
    }
    if(loadding) return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
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
                <p><span className="text-red-500 font-medium">Veh??culo:</span> {vehicle.model}</p>
                <p><span className="text-red-500 font-medium">Placas:</span> {vehicle.plates}</p>
                {milleage.regist?(<p><span className="text-red-500 font-medium">Kilometraje:</span> {milleage.milleage} Km</p>):<p><span className="text-red-500 font-medium">Kilometraje:</span> <input onChange={e => setMilleage({...milleage,milleage: e.target.value, error: false})} className="border-solid border-2 border-red-500 rounded-md px-3 w-2/6" type="number" placeholder="0 km"/><button className="bg-sky-400 ml-1 font-bold rounded-md px-1 py-1 text-white" onClick={handleMilleage}>Registrar</button></p>}
                {milleage.error?(<p className="text-red-500 text-sm">Registro del kilometraje obligatorio</p>):null}
                <hr className="my-5 bg-red-500 h-1 rounded-full"/>
                <div>
                    {route.type === 'shipment'?<p className="text-red-500 font-medium">Env??os a entregar:</p>:<p className="text-red-500 font-medium">Env??os a recolectar:</p>}
                    {route.type === 'pickup'?(
                    <ul>
                        {shipments && shipments.map( (shipment, i) =>(
                            <li key={i} className="p-2 px-4 my-2 bg-blue-500 rounded-full shadow-xl text-white font-bold">{i+1}. {shipment._id} <p>Direcci??n: {shipment.address.city} {shipment.address.state} {shipment.address.colony} {shipment.address.street} {shipment.address.zipCode}</p></li>
                        ))}
                    </ul>
                    ):null}

                    {route.type === 'shipment'?(
                        <ul>
                            {shipments && shipments.map( (shipment, i) =>(
                                <li key={i} className={`p-2 px-4 my-2 rounded-full shadow-xl text-white font-bold ${shipment.stateHistory.find(state => state.comment === 'Cargado al cami??n')?'bg-green-500':'bg-red-500'}`}>{i+1}. {shipment._id} {shipment.stateHistory.find(state => state.comment === 'Cargado al cami??n')?'Registrado':'No Registrado'}</li>
                            ))}
                        </ul>
                    ):null}
                </div>
                {incompleted ? <p className="text-red-500 text-xs">No se ha terminado de registrar todos los env??os</p>: null}
                <button onClick={handleInitRoute} className="mt-5 p-2 text-white font-bold bg-gray-400 rounded-lg hover:bg-white hover:text-green-600 shadow-lg">Iniciar ruta</button>
            </div>
        </div>
    )
}