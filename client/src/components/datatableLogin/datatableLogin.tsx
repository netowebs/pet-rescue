import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth/AuthContex'
import pessoa from '../../assets/images/loginPage/pessoa.png'
import cadeado from '../../assets/images/loginPage/cadeado.png'
import logo from '../../assets/images/loginPage/logowhite.png'

import './datatablelogin.scss'
import moment from 'moment'


export const DatatableLogin = () => {

    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [capsLock, setCapsLock] = useState(false)

    const [showPassword, setShowPassword] = useState(false)

    const togglePass = () => {
        setShowPassword(!showPassword)
    }

    const checkCapsLock = (event: any) => {
        if (event.getModifierState('CapsLock')) {
            setCapsLock(true)
        } else {
            setCapsLock(false)
        }
    }

    const handleLogin = async () => {
        if (id && password) {
            const isLogged = await auth.signin(parseInt(id), password)
            if (isLogged) {
                navigate('/home')
            } else {
                alert('Id ou Senha incorretos')
            }
        }
    }

    const handleSalutation = () => {
        if(moment().hour() >= 6 && moment().hour() < 12){
            return 'Tenha uma excelente manhã de trabalho'
        }else if(moment().hour() >= 12 && moment().hour() < 18){
            return 'Tenha uma excelente tarde de trabalho'
        }else if(moment().hour() >= 18 && moment().hour() < 24){
            return 'Tenha uma excelente noite de trabalho'
        }else{
            return 'Tenha uma excelente madrugada de trabalho'
        }
    }

    return (
        <div className='container-login'>
            <div className="boxTitle">
                <div className="boxLogo">
                    <img 
                        src={logo} 
                        alt=""
                    />
                </div>
                <div className="boxTxt">
                    <span>PetRescue</span>
                </div>
            </div>
            <div className="boxText">
                <>
                    <p className='bemVindo'> SEJA BEM VINDO (a)</p>
                    <p className='salutation'>{
                        handleSalutation()
                    }</p>
                    
                </>
            </div>
            <div className="boxData">
                <div className="boxId">
                    <div className="boxImg">
                        <img
                            src={pessoa}
                            alt=""
                        />
                    </div>
                    <div className="boxInput">
                        <input
                            type="text"
                            className='ipt-id'
                            onChange={(e) => setId(e.target.value)}
                            placeholder={`Id...`}
                        />
                    </div>
                </div>
                <div className="boxSenha">
                    <div className="boxImg">
                        <img
                            src={cadeado}
                            alt=""
                        />
                    </div>
                    <div className="boxInput">
                        <input
                            className='ipt-password'
                            type={showPassword ? 'text' : 'password'}
                            name=""
                            id=""
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyUp={checkCapsLock}
                            placeholder={`Senha...`}
                        />
                    </div>
                </div>
                <p
                    onMouseDown={togglePass}
                    onMouseUp={togglePass}
                    style={
                        {
                            marginTop: '-5px',
                            width: '100%',
                            textAlign: 'right',
                            fontSize: '13px',
                            marginRight: '165px',
                            color: 'white',
                            cursor: 'pointer'
                        }
                    }>
                    exibir senha
                </p>
                {
                    capsLock && (
                        <p>Capslock</p>
                    )
                }
            </div>
            <div className="boxBtn">
                <input
                    className='btnLogin'
                    type="button"
                    value="ENTRAR"
                    onClick={handleLogin}
                />
            </div>
        </div>
    )
}