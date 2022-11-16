//import PrintIcon from '@mui/icons-material/Print';
import moment from 'moment';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './banknew.scss'
import swal from 'sweetalert'

import { banks } from '../../../api/apiBanks';
import { bank } from '../../../api/apiBank';

export const BankNew = () => {

    //Dados do Cadastro
    const [dtCad, setDtCad] = useState(String)
    const [bankName, setBankName] = useState(String)
    const [bankId, setBankId] = useState(Number)
    const [agency, setAgency] = useState(String)
    const [account, setAccount] = useState(String)
    const [balance, setBalance] = useState(Number)

    const getBank = async (bank_id: number) => {
        try {
            let json = await banks.getApiBank(bank_id)
            if(json){
                setBankName(json.name)
            }else{
                alert('Banco não existe')
                setBankName('')
                setBankId(0)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Function Create
    const handleCreate = async () => {
        setBalance(0)
        const data: any = { bankName, bankId, agency, account, balance}

        if (bankName.trim() !=='' && agency.trim() !== '' && account.trim() !== '' && bankId !== 0 && bankId !== null) {
            const res = await bank.createBank(data)
            if (res.success) {
                swal(res.message, " ", "success")
                    .then(() => {
                        window.location.href = '/bank'
                    })
            } else {
                swal("Error !", "" + JSON.stringify(res.message), "error")
            }    
        } else {
            alert('Existem campos vazios')
        }
}

    
    useEffect(() => {
        setDtCad(moment().format('DD/MM/YYYY'))
    }, [dtCad])

    return (
        <div className='container--stock-new'>
            <div className='formDetail'>
                <div className="topBar">
                    <div className="topBar-interno">
                        <div className="topBar-inputs">
                            <div className="boxUser">
                                <label htmlFor="ipt-user">Usuário</label><br />
                                <input
                                    className='ipt-user'
                                    type="text"
                                    disabled
                                />
                            </div>
                            <div className="boxDtCad">
                                <label htmlFor="ipt-dtCad">Data Cadastro</label><br />
                                <input
                                    defaultValue={dtCad}
                                    className='ipt-dtCad'
                                    type="text"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="topBar-Btn">
                            <input type="submit" value="Salvar" className='btnSalvar' onClick={() => handleCreate()} />
                            <Link to={'/bank'}>
                                <input type="button" value="Cancelar" className='btnCancelar' />
                            </Link>
                        </div>
                    </div>
                </div>
                <fieldset className='middleFieldset'>
                    <legend>
                        .::Cadastro de Banco::.
                    </legend>
                    <div className="middleBar">
                        <div className="middleBar-interno">
                            <div className="boxBankId">
                                <label htmlFor="ipt-bankId">Banco</label><br />
                                <input
                                    className='ipt-bankId'
                                    value={bankId}
                                    type="text"
                                    name='bankId'
                                    onChange={
                                        (e) => setBankId(parseInt(e.target.value))
                                    }
                                    onBlur={() => getBank(bankId)}
                                />
                            </div>
                            <div className="boxNameBank">
                                <label htmlFor="ipt-nameBank">Nome Banco</label><br />
                                <input
                                    className='ipt-nameBank'
                                    type="text"
                                    value={bankName}
                                    name='nameBank'
                                    onChange={
                                        (e) => setBankName(e.target.value)
                                    }
                                    disabled
                                />
                            </div>
                            <div className="boxAgency">
                                <label htmlFor="ipt-agency">Agência</label><br />
                                <input
                                    className='ipt-agency'
                                    type="text"
                                    onChange={(e) => setAgency(e.target.value)}
                                />
                            </div>
                            <div className="boxAccount">
                                <label htmlFor="ipt-account">Conta</label><br />
                                <input
                                    className='ipt-account'
                                    type="text"
                                    onChange={
                                        (e) => setAccount(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="message">
                            <span>
                                Neste menu você irá apenas cadastrar uma conta, os lançamentos deverão ser feitos no menu "FINANCEIRO" que está na barra de menus ao lado esquerdo.
                            </span>
                        </div>
                </fieldset>
            </div>
        </div>
    )
}