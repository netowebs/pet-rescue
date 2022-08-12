import { NavBar } from '../../components/navbar/NavBar'
import { SideBar } from '../../components/sidebar/SideBar'
import './single.scss'
import PrintIcon from '@mui/icons-material/Print';

export const Single = () => {
    return(
        <div className='single'>
            <SideBar />
            <NavBar />
            <div className="singleContainer">
                <div className="internalContainer">
                    <div className="buttonBar">
                        <div className="inputs">
                            <div className="idCad">
                                <span>Identificação</span><br />
                                <input value={'000384'} type="number" readOnly/>
                            </div>
                            <div className="dtCad">
                                <span>Data Inclusão</span><br />
                                <input value={'01/01/2022'} type="text" />
                            </div>
                            <div className="dtAlter">
                                <span>Data Ultima Alteração</span><br />
                                <input value={'01/01/2022'} type="text" />
                            </div>
                        </div>
                        <div className="buttons">
                            <div className="printButton">
                                <button className='btnPrint'><PrintIcon /></button>
                            </div>
                            <div className="saveButton">
                                <input type="button" value="Salvar" />
                            </div>
                            <div className="cancelButtom">
                                <input type="button" value="Cancelar" />
                            </div>
                            <div className="deleteButton">
                                <input type="button" value="Excluir" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}