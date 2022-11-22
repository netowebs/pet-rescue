import './sidebar.scss'
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HailIcon from '@mui/icons-material/Hail';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth/AuthContex';
import LocalDiningIcon from '@mui/icons-material/LocalDining';



export const SideBar = () => {

    const auth = useContext(AuthContext)

    const url: string = `\\src\\images\\photosUsers\\${auth.user?.username.replace(/\s/g, '')}.jpg`

    const [showElement, setShowElement] = useState(auth.user?.nivel === 0 ? false : true);

    const navigate = useNavigate()

    const toggleElement = () => {
        if (showElement) {
            setShowElement(false);
        } else {
            setShowElement(true);
        }
    }

    const handleLogout = async () => {
        auth.signout()
        navigate('/')
    }

    return (
        <div className="sidebar">
            <div className="top">
                <span className="logo">Pet Rescue</span>
            </div>
            <hr />
            <div className="userLogged">
                <div className="userPhoto">
                    <img
                        src={url}
                        alt=""
                        className='avatar'>
                    </img>
                </div>
                <div className="userInfo">
                    <div className="userName">
                        {
                            auth.user?.username
                        }
                    </div>
                    <div className="userLevel">{auth.user?.nivel === 0 ? 'padrão' : 'Administrador'}</div>
                </div>
            </div>
            <div className="center">
                <div className="center-top">
                    <ul>
                        <Link className='link' to={'/home'}>
                            <li>
                                <HomeIcon className='icon' />
                                <span>Dashboard</span>
                            </li>
                        </Link>
                        <Link className='link' to={'/adoptions'}>
                            <li>
                                <FavoriteIcon className='icon' />
                                <span>Adoção</span>
                            </li>
                        </Link>
                        <Link className='link' to={'/pets'}>
                            <li>
                                <PetsIcon className='icon' />
                                <span>Cadastro Pet</span>
                            </li>
                        </Link>
                        <Link className='link' to={'/tutors'}>
                            <li>
                                <FamilyRestroomIcon className='icon' />
                                <span>Tutores</span>
                            </li>
                        </Link>
                        <Link className='link' to={'/medical-records'}>
                            <li>
                                <MonitorHeartIcon className='icon' />
                                <span>Ficha Médica</span>
                            </li>
                        </Link>
                        <Link className='link' to={'/feed/new'}>
                            <li>
                                <LocalDiningIcon className='icon' />
                                <span>Alimentar</span>
                            </li>
                        </Link>
                        <Link className='link' to={'/collaborators'}>
                            <li>
                                <HailIcon className='icon' />
                                <span>Colaboradores</span>
                            </li>
                        </Link>
                        <Link className='link' to={'/stock'}>
                            <li>
                                <ProductionQuantityLimitsIcon className='icon' />
                                <span>Estoque</span>
                            </li>
                        </Link>
                        <Link className='link' to={'/vets'}>
                            <li>
                                <MedicalInformationIcon className='icon' />
                                <span>Veterinários</span>
                            </li>
                        </Link>
                    </ul>
                </div>

                {
                    auth.user?.nivel === 1 ? (
                        <div onClick={toggleElement} className="menu-name">
                            <p className="title">Menus de Administração</p>
                            {showElement ? <ArrowUpwardIcon className='icon-arrow' /> : <ArrowDownwardIcon className='icon-arrow' />}
                        </div>)
                        : false
                }
                {showElement ?
                    <div className="center-bottom">
                        <ul>
                            <Link className='link' to={'/financial'}>
                                <li>
                                    <CurrencyExchangeIcon className='icon' />
                                    <span>Lctos Financeiros</span>
                                </li>
                            </Link>
                            <Link className='link' to={'/bank'}>
                                <li>
                                    <AccountBalanceIcon className='icon' />
                                    <span>Cadastro de Contas</span>
                                </li>
                            </Link>
                        </ul>
                    </div>
                    : false
                }
                <ul>
                    <hr />
                    <li onClick={handleLogout}>
                        <LogoutIcon className='icon' />
                        <span>Sair</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}