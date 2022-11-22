import { DatatableLogin } from '../../components/datatableLogin/datatableLogin'
import './login.scss'

export const Login = () => {
    return (
        <div className='login'>
            <div className="fundoLogin">
            {
                <DatatableLogin />
            }
            </div>
            
        </div>
    )
}