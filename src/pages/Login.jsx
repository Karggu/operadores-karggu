import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import LicenseIcon from '../SVG/license.svg'
import PasswordIcon from '../SVG/password.svg'
import logoisokarggu from '../SVG/logoisokarggu.svg'
import auth from '../routes/auth'
import Cookie from 'universal-cookie'
import {useNavigate} from 'react-router-dom'
import { INTEGRATIONS_API, NATIONALS_API } from '../routes/paths.routes'
import loginRoute from '../hooks/loginRoute'

export default function Login(){

    const { register, formState: {errors}, handleSubmit } = useForm()
    const [notFoundRoute, setNotFoundRoute] = useState(false)
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()
    
    useEffect(()=> {
        console.log(INTEGRATIONS_API);
        console.log(NATIONALS_API);
        if(auth.isAuthenticated()){
          return navigate("/route")
        }
    })

  const onSubmit = async data => {
      console.log(data);
      setLoader(true)
      const route = await loginRoute(data)
      if(route.name === "AxiosError") {
        setNotFoundRoute(true)
        setLoader(false)
        return
      }
      if(route.data === null || route.data.vehicle.plates !== data.plates_vehicle ){
          setNotFoundRoute(true)
          setLoader(false)
      } else {
          const cookies = new Cookie()
          cookies.set('auth_route', JSON.stringify(route.data), {path: "/"})
          auth.login(() => {
            navigate("/route")
          })
      }
      

      setLoader(false)
  }

    return(
        <div className='w-full h-screen flex items-center lg:w-2/4 lg:m-auto'>
        <div className='rounded-xl shadow-2xl w-11/12 m-auto p-5 flex flex-col items-center bg-white' id='login-container'>
            <div className='my-5'>
              <img
                src={logoisokarggu}
                alt="Img karggu"
                width={150}
                height={250}
              />
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <h1 className='text-center mb-5 font-bold text-lg text-red-500'>Operador Dashboard</h1>
                  <p className='text-center mb-5 text-red-500'>Llena los campos para buscar la ruta</p>
                  <div className='relative my-4'>
                    <div className='absolute left-1'>
                      <img
                        src={LicenseIcon}
                        alt='icon license'
                        width={50}
                        height={50}
                      />
                    </div>
                    <input type="text" pattern='[a-f0-9]{4}' minLength="4" maxLength="4" className='border-2 pl-14 py-3 placeholder:text-black border-t-0 border-l-0 border-r-0 border-b-slate-800' placeholder='ID de la Ruta' {...register("id_route",{required: true})} aria-invalid={errors.id_route ? "true": "false"}/>
                    {errors.id_route?.type === 'required' && <p role="alert" className='text-red-500 text-sm'>ID de la Ruta obligatoria</p>}
                  </div>
                  <div className='relative my-4'>
                    <div className='absolute left-2 top-1'>
                      <img
                        src={PasswordIcon}
                        alt='icon license'
                        width={40}
                        height={40}
                      />
                    </div>
                    <input type="text" className='border-2 pl-14 py-3 placeholder:text-black border-t-0 border-l-0 border-r-0 border-b-slate-800' placeholder='Placas del vehículo' {...register("plates_vehicle",{required: true})} aria-invalid={errors.plates_vehicle ? "true": "false"}/>
                    {errors.plates_vehicle?.type === 'required' && <p role="alert" className='text-red-500 text-sm'>Placas del vehículo obligatorio</p>}
                  </div>
                  <div className='mb-5 flex flex-col items-center'>
                    {notFoundRoute ? <p className='text-yellow-600 text-sm text-center mb-4'>No se encontró la ruta, verifica los datos ingresados.</p>: ""}
                    {loader ? <div className="lds-rizng"><div></div><div></div><div></div><div></div></div> : <button type='submit' className='relative bg-red-500 rounded-full text-white font-bold text-center py-2 shadow-xl hover:bg-white hover:text-red-500 w-full'>Login</button>}
                    
                  </div>
              </form>
            </div>
        </div>
      </div>
    )
}