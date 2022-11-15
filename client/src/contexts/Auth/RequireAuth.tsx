import {useContext} from 'react'
import { Login } from '../../pages/login/login'
import { AuthContext } from './AuthContex'

export const RequireAuth = ({children}: {children: JSX.Element}) =>{

    const auth = useContext(AuthContext)

    if(!auth.user){
        return <Login />;
    }

    return children
}