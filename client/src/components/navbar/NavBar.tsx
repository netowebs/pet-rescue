import './navbar.scss'

import { useEffect, useState } from 'react';

export const NavBar = () => {
    const [id, setId] = useState(Number)
    const pathName = window.location.pathname

    useEffect(() => {
        setId(parseInt(pathName.split(/\D+/).join(""), 10))
    },[id])

    return (
        <div className="navbar">
            <div className="wrapper">
                {
                    <span className='texto'>
                        {
                            pathName === '/' &&
                            "Dashboard" ||

                            pathName === '/pets/new' &&
                            "Novo Cadastro de Animal" ||
                            pathName === '/pets' &&
                            "Listagem de Animais" ||
                            pathName === '/adopted' &&
                            "Listagem de Animais Adotados" ||
                            pathName === '/death' &&
                            "Listagem de Óbitos de Animais" ||
                            pathName === '/pets' &&
                            "Listagem de Animais" ||
                            pathName === `/pets/${id}` &&
                            `Cadastro do Animal ${id}` ||
                            
                            pathName === '/medical-records/new' &&
                            "Nova Ficha Médica" ||
                            pathName === '/medical-records' &&
                            "Listagem de Fichas Médicas Abertas" ||
                            pathName === '/medical-closed' &&
                            "Listagem de Fichas Médicas Baixadas" ||
                            pathName === `/medical-records/${id}` &&
                            `Ficha Médica do Animal ${id}` ||

                            pathName === '/financial/new' &&
                            "Novo Lançamento Financeiro" ||
                            pathName === '/financial' &&
                            "Listagem de Lançamentos Financeiros" ||
                            pathName === `/financial/${id}` &&
                            `Lançamento financeiro ${id}` ||

                            pathName === '/cadAdmin' &&
                            "Cadastros Administrativos" ||

                            pathName === '/vets/new' &&
                            "Novo Cadastro de Veterinário(a)" ||
                            pathName === '/vets' &&
                            "Listagem de Veterinários" ||
                            pathName === '/medical-closed' &&
                            "Listagem de Fichas Médicas Baixadas" ||
                            pathName === `/vet/${id}` &&
                            `Cadastro do Veterinário(a) ${id}` ||

                            pathName === '/bank/new' &&
                            "Novo Cadastro de Banco" ||
                            pathName === '/bank' &&
                            "Listagem de Bancos" ||
                            pathName === `/bank/${id}` &&
                            `Cadastro do Banco ${id}` ||

                            pathName === '/tutors/new' &&
                            "Novo Cadastro de Tutor(a)" ||
                            pathName === '/tutors' &&
                            "Listagem de Tutores" ||
                            pathName === `/tutor/${id}` &&
                            `Cadastro do Tutor(a) ${id}` ||

                            pathName === '/stock/new' &&
                            "Novo Cadastro de Produto" ||
                            pathName === '/stock' &&
                            "Listagem de Estoque" ||
                            pathName === `/stock/${id}` &&
                            `Cadastro do Produto ${id}` ||

                            pathName === '/lctos' &&
                            "Listagem de Lançamentos de Estoque" ||
                            pathName === '/lctos/new' &&
                            "Novo Lançamento de Estoque" ||
                            pathName === `/stockUpdate/${id}` &&
                            `Dados do lançamento ${id}` ||

                            pathName === '/adoptions' &&
                            "Listagem de Adoções" ||
                            pathName === '/adoptions/new' &&
                            "Novo Adoção" ||
                            pathName === `/adoptions/${id}` &&
                            `Dados da Adoção ${id}`
                            
                        }
                    </span>

                }
            </div>
        </div>
    )
}