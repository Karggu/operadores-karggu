import auth from '../routes/auth'

import LogutImg from '../img/logout.png'

export default function NavOptions(){

    function logout() {
            localStorage.removeItem('auth_route')
            auth.logout(() => {
                window.location = "/"
            })
    }

    return(
        <div className="w-full p-2 bg-red-500 fixed bottom-0 left-0">
            <div>
                <button onClick={logout}>
                    <span>
                        <img src={LogutImg} alt="logut icon" width={40}/>
                    </span>
                </button>
            </div>
        </div>
    )
}