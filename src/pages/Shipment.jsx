import { useState, Fragment } from 'react';
import {useParams} from 'react-router-dom'
import useUploadImg from '../hooks/useUploadImg';
import ImgError from '../img/cerrar.png'
import Close from '../SVG/backward.svg';
import { useNavigate } from "react-router-dom"
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const options = [
    {
      id: 1,
      option: 'Dirección Incorrecta'
    },
    {
      id: 2,
      option: 'Dirección Insuficiente'
    },
    {
      id: 3,
      option: 'Destinatario Ausente'
    },
    {
      id: 4,
      option: 'Etc.',
    }
]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function Shipment(){

    const [selected, setSelected] = useState(options[0])
    const navigate = useNavigate()
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

    function closePage() {
        navigate("/route/road");
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
                    <div className="flex justify-center h-14">
                        <button onClick={closePage}><img src={Close} alt="close button" className="w-7 h-7 absolute left-5 top-4"/></button>
                        <h3 className='font-bold text-center text-lg my-4'>Confirmación de envío</h3>
                    </div>
                    <div className='w-11/12 m-auto shadow-xl border-2 rounded-md border-black-500 p-5'>
                        <p className='font-semibold'>Envío:</p>
                        <p className='mb-4 text-slate-600'>{shipment_id}</p>
                        <p className='mb-4 text-yellow-600 font-medium'>Sube una foto como evidencia de que el envío se entrego correctamente.</p>
                        <label htmlFor="img_input" className='p-2 bg-blue-400 rounded-md font-medium cursor-pointer text-white'>Subir imagén</label>
                        <input type="file" name="" id="img_input" className='opacity-0' onChange={HandleImgUpload}/>
                        {/* <button className="p-1 mx-1 bg-green-500 font-bold rounded-md text-white">Enregar envío</button> */}
                    </div>
                </>
            ):null}
            {status === 'rechazar'?(
                <>
                    <div className="flex justify-center h-14">
                        <button onClick={closePage}><img src={Close} alt="close button" className="w-7 h-7 absolute left-5 top-4"/></button>
                        <h3 className='font-bold text-center text-lg my-4'>Rechazo de un envío</h3>
                    </div>
                    <div className='w-11/12 m-auto shadow-xl border-2 border-black-500 rounded-md p-5'>
                        <p className='font-semibold'>Envío:</p>
                        <p className='mb-5 text-slate-600'>{shipment_id}</p>
                        <p className='mb-2 text-red-600 font-medium'>Escriba la razón por la que el envío es rechazado.</p>
                        <textarea className='border-2 border-black-700 rounded-md p-2 w-full h-28 text-sm sm:text-base'></textarea>
                        <button className="p-1 mt-2 bg-red-500 font-bold rounded-md text-white">Rechazar envío</button>
                    </div>
                </>
            ):null}
            {status === 'intento'?(
                <>
                    <div className="flex justify-center h-14">
                        <button onClick={closePage}><img src={Close} alt="close button" className="w-7 h-7 absolute left-5 top-4"/></button>
                        <h3 className='font-bold text-center text-lg my-4'>Intento de envío</h3>
                    </div>
                    <div className='w-11/12 m-auto shadow-xl border-2 rounded-md border-black-500 p-5'>
                        <p className='font-semibold'>Envío:</p>
                        <p className='mb-5 text-slate-600'>{shipment_id}</p>
                        <p className='mb-2 text-yellow-600 font-medium'>Seleccione la opción por la que el envío no pudo ser entregado.</p>
                        <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                            <>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-yellow-600 focus:outline-none focus:ring-1 focus:ring-yellow-600 sm:text-sm">
                                <span className="flex items-center">
                                    <span className="block truncate">{selected.option}</span>
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                                </Listbox.Button>

                                <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {options.map((option) => (
                                    <Listbox.Option
                                        key={option.id}
                                        className={({ active }) =>
                                        classNames(
                                            active ? 'text-white bg-yellow-500' : 'text-gray-900',
                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                        )
                                        }
                                        value={option}
                                    >
                                        {({ selected, active }) => (
                                        <>
                                            <div className="flex items-center">
                                            <span
                                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                            >
                                                {option.option}
                                            </span>
                                            </div>

                                            {selected ? (
                                            <span
                                                className={classNames(
                                                active ? 'text-white' : 'text-black',
                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                )}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                            ) : null}
                                        </>
                                        )}
                                    </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                                </Transition>
                            </div>
                            </>
                        )}
                        </Listbox>
                        <button className="mt-3 p-1 mx-1 bg-yellow-500 font-bold rounded-md text-white">Registrar intento</button>
                    </div>
                </>
            ): null}
        </div>
    )
}