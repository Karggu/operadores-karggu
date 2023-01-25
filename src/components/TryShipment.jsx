import { useState, Fragment } from "react";
import stateShipment from "../hooks/stateShipment";
import registTryOrder from "../hooks/updateRegistTryOrder";
import ImgAdvert from '../img/advertencia.png'
import Close from '../SVG/backward.svg';
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

export default function TryShipment ({shipment_id, intent, closePage}){

    // const [tryOrder, setTryOrder] = useState('Dirección incorrecta')
    const [selected, setSelected] = useState(options[0])

    // const handleChangeSelect = e => {
    //     console.log(e.target.value);
    //     setTryOrder(e.target.value)
    // }

    const handleRegistTry = async () => {
        console.log(selected);
        // const res = await registTryOrder(shipment_id, {comment: tryOrder})
        // const state = await stateShipment(shipment_id, "Intento Entrega")
        // console.log(res);
        // console.log(state);
    }

    return(
        <>

            <div className="flex justify-center h-14">
                        <button onClick={closePage}><img src={Close} alt="close button" className="w-7 h-7 absolute left-5 top-4"/></button>
                        <h3 className='font-bold text-center text-lg my-4'>Intento de envío</h3>
                    </div>
                    <div className='w-11/12 m-auto shadow-xl border-2 rounded-md border-black-500 p-5'>
                        <p className='font-semibold'>Envío:</p>
                        <p className='mb-5 text-slate-600'>{shipment_id}</p>
                        {intent?(<div className="flex flex-col items-center">
                            <p className='mb-2 text-yellow-600 font-medium'>Intento de envío registrado.</p>
                            <img src={ImgAdvert} alt="warning icon" width={50}/>
                        </div>):(<>
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
                            <button className="mt-3 p-1 mx-1 bg-yellow-500 font-bold rounded-md text-white" onClick={handleRegistTry}>Registrar intento</button>
                        </>)}
                    </div>
            </>
    )
}