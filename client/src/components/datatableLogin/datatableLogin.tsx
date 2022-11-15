import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth/AuthContex'

import './datatablelogin.scss'


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

    return (
        <div className='container-login'>
            <div className="boxTitle">
                LOGIN - PetRescue
            </div>
            <div className="boxData">
                <div className="boxId">
                    <span>ID</span>
                    <input
                        type="text"
                        className='ipt-id'
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div className="boxSenha">
                    <span>SENHA</span>
                    <input
                        className='ipt-password'
                        type={showPassword ? 'text' : 'password'}
                        name=""
                        id=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyUp={checkCapsLock}
                    />
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
                            marginRight: '130px',
                            color: '#16a685',
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