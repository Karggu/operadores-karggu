import { useEffect, useState } from "react"
import useShipmentsFolios from "../hooks/useShipmentsFolios"
import Cookie from 'universal-cookie'
import { useNavigate } from "react-router-dom"
import ImgWarning from '../img/advertencia.png'
import Close from '../SVG/backward.svg';
import initRoute from "../hooks/initRoute"
import registMilleage from "../hooks/milleageRegist"
// import auth from "../routes/auth"

export default function RouteRoad(){

    const [shipments, setShipments] = useState([])
    const [routeCompleted, setRouteCompleted] = useState(true)
    const [milleage, setMilleage] = useState(null)
    const [modalMilleage, setModalMilleage] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {

        const cookies = new Cookie()
        const route = cookies.get("auth_route")

        const GetFolios = async () => {
            const shipments = await useShipmentsFolios(route.folios, route.type)
            if(route.type === 'shipment'){
                const filter_shipments = shipments.data.response.map(shipment =>{
                    shipment.state = shipment.stateHistory[shipment.stateHistory.length -1]
                    return shipment
                })
                console.log(filter_shipments);
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

    const handleInitRoute = async () => {
        const states = shipments.map(shipment => shipment.state.comment)
        console.log(states);
        states.map( state =>{
            console.log(state);
            if(state !== 'Entregado' && state !== 'Rechazado' && state !== 'Intento Entrega'){
                console.log('esto pasa');
                setRouteCompleted(false)
            }
            return state
        })
        console.log(routeCompleted);
        if(routeCompleted){
            const cookies = new Cookie()
            const route = cookies.get("auth_route")
            const res = await initRoute(route._id,"Fin de Ruta")
            console.log(res);
            if(res.success) setModalMilleage(true)
        }
    }
    
    const handleMilleage = async ()=> {
        console.log('milleage');
        const cookies = new Cookie()
        const route = cookies.get("auth_route")
        const milleage_regist = await registMilleage({id: route._id, milleage_type: 'finish', milleage: milleage})
        console.log(milleage_regist);
        if(milleage_regist.success){
            navigate("/route/success")
        }
    }

    return(
        <div>
            {modalMilleage?(<>
                <div className="bg-white w-11/12 p-5 rounded-lg z-10 fixed left-3 top-24 flex flex-col items-center">
                <p className="text-center mt-2 mb-2">Registra el kilometraje final del vehículo.</p>
                <input type="number" className="rounded-md border-gray-600 border-2 p-2" placeholder="Kilometraje en km" onChange={e => setMilleage(e.target.value)}/>
                <button className="p-2 rounded-md text-white bg-blue-500 font-bold mt-2" onClick={handleMilleage}>Registrar</button>
            </div>
            <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-25"></div></>):null}
            {!routeCompleted?(<>
                <div className="bg-white w-11/12 p-5 rounded-lg z-10 fixed left-3 top-24 flex flex-col items-center">
                <img src={ImgWarning} alt="warning icon" width={50}/>
                <p className="text-center mt-2">No puedes terminar la ruta hasta completar los status de los envíos.</p>
                <button className="p-2 rounded-md text-white bg-yellow-500 font-bold mt-2" onClick={() => setRouteCompleted(true)}>Entendido</button>
            </div>
            <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-25"></div></>):null}
            <div className="flex justify-center h-14">
                <button onClick={closePage}><img src={Close} alt="close button" className="w-7 h-7 absolute left-5 top-5"/></button>
                <h3 className="text-center font-bold mt-5 text-lg ">Entrega de envíos</h3>
            </div>
            <div className="w-11/12 border-2 m-auto mt-3 rounded-md shadow-xl border-black-500 p-2">
                {shipments.map(shipment => (
                    <div key={shipment._id} className={`${shipment.state.comment === 'Entregado'?'bg-green-600':shipment.state.comment === 'Rechazado'?'bg-red-600':shipment.state.comment === 'Intento Entrega'?'bg-yellow-600':'bg-blue-500'} p-3 rounded-md shadow-xl text-white mb-3`}>
                        <p className="font-bold">Envío:</p>
                        <p className="text-slate-100">{shipment._id}</p>
                        <p className="font-bold mt-3">Dirección: </p>
                        <p className="text-slate-100">{shipment.places.delivery.address.municipality}, {shipment.places.delivery.address.colony}, {shipment.places.delivery.address.streetAndNumber}, #{shipment.places.delivery.address.numExterior}, {shipment.places.delivery.address.numInterior == null ? `#${shipment.places.delivery.address.numInterior}` : ''} C.P. {shipment.places.delivery.address.zipCode}</p>
                        {shipment.state.comment !== 'Entregado' && shipment.state.comment !== 'Rechazado' && shipment.state.comment !== 'Intento Entrega'?(<>
                            <hr className="my-2"/>
                            <div className="flex mt-3">
                                <button className="p-1 bg-green-500 font-bold rounded-md w-1/3" onClick={() => handleState(shipment, 'entregar')}>Entregar</button>
                                <button className="p-1 mx-3 bg-red-500 font-bold rounded-md w-1/3" onClick={() => handleState(shipment, 'rechazar')}>Rechazar</button>
                                <button className="p-1 mx-1 bg-yellow-500 font-bold rounded-md w-1/3" onClick={() => handleState(shipment, 'intento')}>Intento</button>
                            </div></>):<p className="text-center font-bold mt-4">{shipment.state.comment.toUpperCase()}</p>}
                    </div>
                ))}
            </div>
            <div className="w-11/12 h-14 border-2 m-auto mt-2 rounded-md shadow-xl border-black-500 pt-[.4rem] pl-2">
                <button className="p-2 h-10 bg-green-500 text-white font-bold rounded-md shadow-xl" onClick={handleInitRoute}>Finalizar ruta</button>
            </div>
        </div>
    )
}