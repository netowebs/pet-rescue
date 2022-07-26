import './sidebar.scss'
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HailIcon from '@mui/icons-material/Hail';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useState } from 'react';

export const SideBar = () => {

    const [showElement, setShowElement] = useState(true);

    const toggleElement = () => {
        if(showElement){
            setShowElement(false);
        }else{
            setShowElement(true);
        }
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
                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                        alt="" 
                        className='avatar'/>
                </div>
                <div className="userInfo">
                    <div className="userName">João A. Cunha</div>
                    <div className="userLevel">admin</div>
                </div>
            </div>
            <div className="center">
                <div className="center-top">
                    <ul>
                        <li>
                            <HomeIcon className='icon' />
                            <span>Dashboard</span>
                        </li>
                        <li>
                            <FavoriteIcon className='icon' />
                            <span>Adoção</span>
                        </li>
                        <li>
                            <PetsIcon className='icon' />
                            <span>Cadastro Pet</span>
                        </li>
                        <li>
                            <MonitorHeartIcon className='icon' />
                            <span>Ficha Médica</span>
                        </li>
                    </ul>
                </div>
                <div onClick={toggleElement} className="menu-name">
                        <p className="title">Menus de Administração</p>
                        {showElement ? <ArrowUpwardIcon className='icon-arrow'/> : <ArrowDownwardIcon className='icon-arrow'/>}
                        
                    </div>
                {showElement ?
                <div className="center-bottom">
                    <ul>
                        <li>
                            <FamilyRestroomIcon className='icon' />
                            <span>Cadastro de Tutores</span>
                        </li>
                        <li>
                            <CurrencyExchangeIcon className='icon' />
                            <span>Financeiro</span>
                        </li>
                        <li>
                            <HailIcon className='icon' />
                            <span>Colaboradores</span>
                        </li>
                        <li>
                            <PasswordIcon className='icon' />
                            <span>Cadasatro de Usuários</span>
                        </li>
                        <li>
                            <ProductionQuantityLimitsIcon className='icon' />
                            <span>Estoque</span>
                        </li>
                    </ul>
                </div>
                : null}
                <ul>
                    <hr />
                    <li>
                        <LogoutIcon className='icon' />
                        <span>Sair</span>
                    </li>
                 </ul>
            </div>
            <div className="bottom">
                <div className="colorOption"></div>
                <div className="colorOption"></div>
            </div>
        </div>
    )
}