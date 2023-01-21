import LogutImg from '../img/logout.png'

export default function NavOptions(){
    return(
        <div className="w-full p-2 bg-red-500 fixed bottom-0 left-0">
            <div>
                <img src={LogutImg} alt="logut icon" width={40}/>
            </div>
        </div>
    )
}