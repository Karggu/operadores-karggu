import { useEffect, useState } from "react"
import getPickups from "../hooks/getPickups"
import Cookies from "universal-cookie"
import statusPickup from "../hooks/statusCollection"
import ImgAdvert from '../img/advertencia.png'

export default function RouteCollection(){

    const [pickups, setPickups] = useState([])
    const [modalWarning, setModalWarning] = useState(false)
 
    useEffect(() => {
        const getPickupsAll = async () => {
            const cookies = new Cookies()
            const route = cookies.get("auth_route")
            const pickups = await getPickups(route.folios)
            const filter_pickups = pickups.pickupOrders.map( pickup =>{
                pickup.state = pickup.status[pickup.status.length - 1]
                return pickup
            })
            console.log(filter_pickups);
            setPickups(filter_pickups)
        }
        getPickupsAll()
    },[])

    const handleCollection = async (id, status) => {
        const res = await statusPickup(id, {comment: status})
        console.log(res);
    }

    const finishRecolections = () => {
        pickups.map(pickup => {
            if(pickup.state.comment !== 'Recolectado' && pickup.state.comment !== 'No Recolectado'){
                setModalWarning(true)
            }
            return pickup
        })

        if(modalWarning){
            console.log('ruta incompleta');
        }else{
            console.log('ruta completa');
        }

    }

    return(
        <div className="w-screen min-h-screen">
            {modalWarning?(<>
                <div className="w-11/12 left-3 top-10 fixed z-10 rounded-md bg-white p-3 text-center flex flex-col items-center">
                <img src={ImgAdvert} alt="icono de advertencia" width={50} className="my-4"/>
                <p className="text-yellow-500 font-bold">NO PUEDES FINALIZAR LA RECOLECCIONES, AÚN HAY RECOLECCIONES PENDIENTES.</p>
                <button className="p-2 rounded-md font-bold text-white bg-yellow-500 mt-4">Entendido</button>
            </div>
            <div className="w-screen h-screen bg-black opacity-25 fixed top-0 left-0"></div></>):null}
            <h2 className="text-center font-bold mt-4">Envíos a recolectar</h2>
            <div className="mt-4 w-11/12 shadow-lg rounded-md m-auto flex flex-col items-center py-3 border-black-500 border-2">
                {pickups.map(pickup => (
                    <div key={pickup._id} className={`${pickup.state.comment === 'Recolectado'?'bg-green-600':'bg-blue-500'} w-11/12 rounded-md shadow-lg p-2 text-white`}>
                        <p>Recolección: {pickup._id}</p>
                        <p>Dirección: {pickup.address.city} {pickup.address.colony} {pickup.address.municipality} {pickup.address.street} Num.ext {pickup.address.ext}</p>
                        {pickup.state.comment !== 'Recolectado' && pickup.state.comment !== 'No Recolectado'?(<>
                            <hr />
                            <button onClick={() =>handleCollection(pickup._id, "Recolectado")} className="font-bold text-white p-2 bg-green-500 rounded-md m-2">Recolectar</button>
                            <button className="font-bold text-white p-2 bg-red-500 rounded-md m-2" onClick={() => handleCollection(pickup._id, "No Recolectado")}>No recolectado</button></>):<p className="text-center font-bold">{pickup.state.comment.toUpperCase()}</p>}
                    </div>
                ))}
            </div>
            <div className="mt-4 w-11/12 shadow-lg rounded-md m-auto p-3">
                <button className="bg-blue-600 font-bold text-white p-2 rounded-md" onClick={finishRecolections}>Finalizar Recolecciones</button>
            </div>
        </div>
    )
}