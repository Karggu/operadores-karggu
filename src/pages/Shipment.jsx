import { useState } from 'react';
import {useParams} from 'react-router-dom'
import useUploadImg from '../hooks/useUploadImg';
import ImgError from '../img/cerrar.png'

export default function Shipment(){

    const {shipment_id, status} = useParams()
    const [errorImg, setErrorImg] = useState(false)

    const HandleImgUpload = async e => {
        setErrorImg(!errorImg)
        console.log(e.target.files[0]);
        const file = e.target.files[0]
        if(file.type !== 'image/png' || file.type !== 'image/jpeg'){
            setErrorImg(!errorImg)
        }
        const file_url = `shipments-evidence/${shipment_id}.pdf`
        const upload = await useUploadImg(file, file_url)
        console.log(upload);
    }

    return(
        <div>
            {errorImg?(
                <>
                <div className='w-5/6 h-60 bg-white absolute top-20 z-10 rounded-md shadow-xl left-7 text-center p-4 flex flex-col justify-center items-center'>
                    <img src={ImgError} width={50} alt="error icon"/>
                    <h3 className='mb-4 font-bold mt-4'>Error al subir la imagén.</h3>
                    <p className='text-yellow-600 font-medium mb-4'>El formato de la imagen tiene que se en jpg ó png.</p>
                    <button className='p-2 font-bold rounded-md bg-blue-500' onClick={() =>setErrorImg(!errorImg)}>Entendido</button>
                </div>
                <div className='absolute top-0 left-0 bg-slate-800 w-full h-screen opacity-50'>
                </div>
            </>
            ):null}
            {status === 'entregar'?(
                <>
                <h3 className='font-bold text-center my-4'>Confirmación de envío</h3>
                <div className='w-11/12 m-auto shadow-xl border-2 border-black-500 p-5'>
                    <p className='mb-6'>Envío: {shipment_id}</p>
                    <p className='mb-6 text-yellow-600 font-medium'>Sube una foto como evidencia de que el envío se entrego correctamente.</p>
                    <label htmlFor="img_input" className='p-2 bg-blue-400 rounded-md font-medium'>Subir imagén</label>
                    <input type="file" name="" id="img_input" className='opacity-0' onChange={HandleImgUpload}/>
                    {/* <button className="p-1 mx-1 bg-green-500 font-bold rounded-md text-white">Enregar envío</button> */}
                </div>
                </>
            ):null}
            {status === 'rechazar'?(
                <>
                <h3 className='font-bold text-center my-4'>Rechazo de un envío</h3>
                <div className='w-11/12 m-auto shadow-xl border-2 border-black-500 p-5'>
                    <p className='mb-6'>Envío: {shipment_id}</p>
                    <p className='mb-6 text-red-600 font-medium'>Escriba la razón por el que el envío es rechazado.</p>
                    <textarea cols="30" rows="10" className='border-2 border-black-700'></textarea>
                    <button className="p-1 mx-1 bg-red-500 font-bold rounded-md text-white">Rechazar envío</button>
                </div>
                </>
            ):null}
            {status === 'intento'?(
                <>
                <h3 className='font-bold text-center my-4'>Intento de envío</h3>
                <div className='w-11/12 m-auto shadow-xl border-2 border-black-500 p-5'>
                    <p className='mb-6'>Envío: {shipment_id}</p>
                    <p className='mb-6 text-yellow-600 font-medium'>Seleccione la opción por la que el envío no pudo ser entregado a su destino.</p>
                    <select name="" id="">
                        <option value="">Dirección incorrecta</option>
                        <option value="">Dirección insuficiente</option>
                        <option value="">Destinatario ausente</option>
                        <option value="">Etc.</option>
                    </select>
                    <button className="p-1 mx-1 bg-yellow-500 font-bold rounded-md text-white">Registrar intento</button>
                </div>
                </>
            ): null}
        </div>
    )
}