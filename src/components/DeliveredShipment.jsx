import ImgAccept from '../img/accept.png'

export default function DeliveredShipment({shipment_id, finish, uploadImg, handleFinishShipment, HandleImgUpload, errorImg, ImgError, setErrorImg}){
    return(
        <>  {errorImg?(
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
                <h3 className='font-bold text-center my-4'>Confirmación de envío</h3>
                <div className='w-11/12 m-auto shadow-xl border-2 border-black-500 p-5'>
                    <p className='mb-6'>Envío: {shipment_id}</p>
                    {finish?(<div className='flex flex-col justify-center w-full items-center'>
                            <p className='text-green-700 font-bold mb-2'>Envío Finalizado.</p>
                            <img src={ImgAccept} alt="icon accept" width={50}/>
                        </div>):null}
                    {uploadImg && !finish?(
                        <>
                        <p className='text-green-800 font-bold'>Imagén subida exitosamente</p>
                        <button className="p-1 mx-1 bg-green-500 font-bold rounded-md text-white mt-3" onClick={handleFinishShipment}>Finalizar envío envío</button>
                        </>
                    ):null}
                    {!uploadImg?(
                        <>
                        <p className='mb-6 text-yellow-600 font-medium'>Sube una foto como evidencia de que el envío se entrego correctamente.</p>
                        <label htmlFor="img_input" className='p-2 bg-blue-400 rounded-md font-medium'>Subir imagén</label>
                        <input type="file" name="" id="img_input" className='opacity-0' onChange={HandleImgUpload}/></>
                    ):null}
                </div>
                </>
    )
}