import { DtSingle } from '../../components/datatablePet/single/DtSingle'
import { NavBar } from '../../components/navbar/NavBar'
import { SideBar } from '../../components/sidebar/SideBar'
import './single.scss'

export const Single = () => {
    return(
        <div className='single'>
            <SideBar />
            <NavBar />
            <div className="conteudo">
                <DtSingle />
            </div>
        </div>
    )
}