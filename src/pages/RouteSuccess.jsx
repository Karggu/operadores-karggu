import ImgAccept from '../img/accept.png'
import {useNavigate} from 'react-router-dom'
import auth from '../routes/auth'

export default function RouteSuccess(){

    const navigate = useNavigate()

    const handleLogout = () => {
        auth.logout(() => {
        navigate("/")
        })
    }


    return(
        <div className="w-screen flex flex-col items-center mt-10">
            <img src={ImgAccept} alt="icon accept" width={50}/>
            <h1 className='mt-2 text-green-700 font-bold'>Ruta completada</h1>
            <button className='p-2 text-white font-bold rounded-md bg-green-700 mt-4' onClick={handleLogout}>Regresar al Login</button>
        </div>
    )
}