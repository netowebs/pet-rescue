import './navbar.scss'

import { useEffect, useState } from 'react';
import moment from 'moment';

export const NavBar = () => {
    const [id, setId] = useState(Number)
    const [path, setPath] = useState(String)

    useEffect(() => {
        const handlePath = () => {
            setPath(window.location.pathname)
            setId(parseInt(path.split(/\D+/).join(""), 10))
        }
        handlePath()
    },[id, path ,window.location.pathname])

    return (
        <div className="navbar">
            <div className="wrapper">
                {
                    <span className='texto'>
                        {
                            path === '/home' &&
                            "Dashboard" ||

                            path === '/pets/new' &&
                            "Novo Cadastro de Animal" ||
                            path === '/pets' &&
                            "Listagem de Animais" ||
                            path === '/adopted' &&
                            "Listagem de Animais Adotados" ||
                            path === '/death' &&
                            "Listagem de Óbitos de Animais" ||
                            path === '/pets' &&
                            "Listagem de Animais" ||
                            path === `/pets/${id}` &&
                            `Cadastro do Animal ${id}` ||
                            
                            path === '/medical-records/new' &&
                            "Nova Ficha Médica" ||
                            path === '/medical-records' &&
                            "Listagem de Fichas Médicas Abertas" ||
                            path === '/medical-closed' &&
                            "Listagem de Fichas Médicas Baixadas" ||
                            path === `/medical-records/${id}` &&
                            `Ficha Médica ${id}` ||

                            path === '/financial/new' &&
                            "Novo Lançamento Financeiro" ||
                            path === '/financial' &&
                            "Listagem de Lançamentos Financeiros" ||
                            path === `/financial/${id}` &&
                            `Lançamento financeiro ${id}` ||

                            path === '/cadAdmin' &&
                            "Cadastros Administrativos" ||

                            path === '/vets/new' &&
                            "Novo Cadastro de Veterinário(a)" ||
                            path === '/vets' &&
                            "Listagem de Veterinários" ||
                            path === '/medical-closed' &&
                            "Listagem de Fichas Médicas Baixadas" ||
                            path === `/vet/${id}` &&
                            `Cadastro do Veterinário(a) ${id}` ||

                            path === '/bank/new' &&
                            "Novo Cadastro de Banco" ||
                            path === '/bank' &&
                            "Listagem de Bancos" ||
                            path === `/bank/${id}` &&
                            `Cadastro do Banco ${id}` ||

                            path === '/tutors/new' &&
                            "Novo Cadastro de Tutor(a)" ||
                            path === '/tutors' &&
                            "Listagem de Tutores" ||
                            path === `/tutor/${id}` &&
                            `Cadastro do Tutor(a) ${id}` ||

                            path === '/stock/new' &&
                            "Novo Cadastro de Produto" ||
                            path === '/stock' &&
                            "Listagem de Estoque" ||
                            path === `/stock/${id}` &&
                            `Cadastro do Produto ${id}` ||
                            path === `/lowStock` &&
                            'Listagem de Estoque Baixo' ||

                            path === '/lctos' &&
                            "Listagem de Lançamentos de Estoque" ||
                            path === '/lctos/new' &&
                            "Novo Lançamento de Estoque" ||
                            path === `/stockUpdate/${id}` &&
                            `Dados do lançamento ${id}` ||

                            path === '/adoptions' &&
                            "Listagem de Adoções" ||
                            path === '/adoptions/new' &&
                            "Novo Adoção" ||
                            path === `/adoptions/${id}` &&
                            `Dados da Adoção ${id}` ||

                            path === '/collaborators/new' &&
                            "Novo Cadastro Funcionário(a)" ||
                            path === '/collaborators' &&
                            "Listagem de Funcionários" ||
                            path === `/collaborators/${id}` &&
                            `Cadastro do Funcionário(a) ${id}` ||

                            path === '/feed/new' &&
                            `Alimentação do dia ${moment().format('DD/MM/YYYY')}`
                        }
                    </span>
                }
            </div>
        </div>
    )
}