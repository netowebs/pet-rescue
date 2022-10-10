import { Link } from 'react-router-dom'
import './adminbuttons.scss'

export const AdminButtons = () => {
    return (
        <div className="container--adminButtons">
            <div className="boxCadVet">
                <Link to={'/vets'}>
                    <input type="button" value="Cadastro de Veterinários" />
                </Link>
            </div>
            <div className="boxCadCaixasBancos">
                <Link to={'/bank'}>
                    <input type="button" value="Cadastro de Bancos e Caixas" />
                </Link>
            </div>
            <div className="boxCadTutores">
                <Link to={'/tutors'}>
                    <input type="button" value="Cadastro de Tutores" />
                </Link>
            </div>
            <div className="boxCadColaboradores">
                <Link to={'collaborators'}>
                    <input type="button" value="Cadastro de Colaboradores" />
                </Link>
            </div>
            <div className="boxCadEstoque">
                <Link to={'/stock'}>
                    <input type="button" value="Cadastro de Estoque" />
                </Link>
            </div>
            <footer>
                Esta área é destinada apenas á administradores do sistema, caso esteja vendo essa tela e não é um administrador, imediatamente encerre o sistema e comunique ao seu superior
            </footer>
        </div>
    )
}