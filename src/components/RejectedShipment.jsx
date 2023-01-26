import ImgError from '../img/cerrar.png'
import Close from '../SVG/backward.svg';

export default function Rejectedshipment({shipment_id, reject, closePage, handleRejectShipment, error,handleChange, loader}){

    return(
        <>
            <div className="flex justify-center h-14">
                        <button onClick={closePage}><img src={Close} alt="close button" className="w-7 h-7 absolute left-5 top-4"/></button>
                        <h3 className='font-bold text-center text-lg my-4'>Rechazo de un envío</h3>
                    </div>
                    <div className='w-11/12 m-auto shadow-xl border-2 border-black-500 rounded-md p-5'>
                        <p className='font-semibold'>Envío:</p>
                        <p className='mb-5 text-slate-600'>{shipment_id}</p>
                        {reject?<div className="flex flex-col items-center">
                            <p className='mb-2 text-red-600 font-medium'>Envío rechazado.</p>
                            <img src={ImgError} alt="icon error" width={50}/>
                        </div>:(<><p className='mb-2 text-red-600 font-medium'>Escriba la razón por la que el envío es rechazado.</p>
                        <textarea className='border-2 border-black-700 rounded-md p-2 w-full h-28 text-sm sm:text-base' onChange={handleChange}></textarea>
                        {error?<p className="text-red-600 font-bold my-2 text-xs">El mensaje es muy corto, debe tenr un mínimo de 5 caracteres.</p>:null}
                        <button className="p-1 mt-2 bg-red-500 font-bold rounded-md text-white" onClick={handleRejectShipment}>Rechazar envío</button></>)}
                        {loader ? <div className="lds-ring mb-8"><div></div><div></div><div></div><div></div></div> : null}
                    </div>
        </>
    )
}