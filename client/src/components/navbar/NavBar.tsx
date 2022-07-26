import './navbar.scss'

import NotificationsIcon from '@mui/icons-material/Notifications';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import EmailIcon from '@mui/icons-material/Email';

export const NavBar = () => {
    return(
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder='Pesquisar...'/>
                    <LocationSearchingIcon />
                </div>
                <div className="items">
                    <div className="item">
                        <NotificationsIcon className='icon' />
                        <div className="counter">3</div>
                    </div>
                    <div className="item">
                        <EmailIcon className='icon' />
                        <div className="counter">5</div>
                    </div>
                </div>
            </div>
        </div>
    )
}