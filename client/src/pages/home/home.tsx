import { NavBar } from '../../components/navbar/NavBar'
import { SideBar } from '../../components/sidebar/SideBar'
import { Widgets } from '../../components/widgets/Widgets'
import './home.scss'

export const Home = () => {
    return(
        <div className='home'>
            <SideBar />
            <div className="homeContainer">
                <NavBar />
                <div className="widgets">
                    <Widgets />
                </div>
            </div>
        </div>
    )
}
