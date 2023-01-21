import Cookie from 'universal-cookie'

class Auth{
    constructor(){
        const cookies = new Cookie()
        if(cookies.get('auth_route')){
            this.authenticated = true;
        }else{
            this.authenticated = false
        }
    }

    login(cb){
        const cookies = new Cookie()
        if(cookies.get('auth_route')){
            this.authenticated = true
        }
        cb()
    }

    logout(cb){
        this.authenticated = false;
        cb();
    }

    isAuthenticated(){
        return this.authenticated
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Auth()