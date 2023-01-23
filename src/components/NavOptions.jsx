import auth from '../routes/auth'
import Cookie from 'universal-cookie'

import LogutImg from '../img/logout.png'

export default function NavOptions(){

    function logout() {
        const cookies = new Cookie()
            cookies.remove('auth_route')
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