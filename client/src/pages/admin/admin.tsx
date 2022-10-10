import { AdminButtons } from '../../components/adminButtons/AdminButtons'
import { NavBar } from '../../components/navbar/NavBar'
import { SideBar } from '../../components/sidebar/SideBar'
import './admin.scss'

export const Admin = () => {
    return(
        <div className='admin'>
            <nav>
                <SideBar />
            </nav>
            <div className="adminContainer">
                <NavBar />
                <div className="adminButtons">
                    <AdminButtons />
                </div>
            </div>
        </div>
    )
}
