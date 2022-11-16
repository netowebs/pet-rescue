import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './banksingle.scss'
import { bank } from '../../../api/apiBank';
import { lctoFinancial } from '../../../api/apiLctoFinancial';

type ArrPivoFinancial = {
    id: number
    date_lcto: string
    idBank: number,
    id_bank?: number
    ttype: string,
    vvalue: string,
    description: string
    totCredito: string,
    totDebito: string
}

type ArrList = {
    idLcto: number,
    date: string,
    time: string,
    totCredito: string,
    totDebito: string
}

export const BankSingle = () => {

    const params = useParams()

    //State Banco
    const [idCad, setIdCad] = useState(Number)
    const [idBank, setIdBank] = useState(Number)
    const [nameBank, setNameBank] = useState(String)
    const [agency, setAgency] = useState(String)
    const [account, setAccount] = useState(String)
    const [balance, setBalance] = useState(Number)
    const [totCred, setTotCredito] = useState(Number)
    const [totDeb, setTotDebito] = useState(Number)

    //Array tabela pivo
    const [arrLctos, setArrLctos] = useState<ArrList[]>([])
    const [arrAux, setArrAux] = useState<ArrPivoFinancial[]>([])

    useEffect(() => {
        if (params.Id) {
            const loadBank = async (id: string) => {
                let json = await bank.getBank(id)
                setIdBank(json.data.id_bank)
                setNameBank(json.data.name_bank)
                setAgency(json.data.agency)
                setAccount(json.data.account)
                setBalance(json.data.balance)
                setTotCredito(json.data.tot_creditos)
                setTotDebito(json.data.tot_debitos)
                let json2 = await lctoFinancial.getAllLcto()
                setArrAux(json2.data)
            }
            loadBank(params.Id)
        }

    }, [])

    useEffect(() => {
        const loadList = async (id: string) => {
            let newArr = [...arrLctos]
            arrAux.forEach((item, index) => {
                if (item?.id_bank === parseInt(id)) {
                    newArr = [...newArr, { idLcto: item.id, date: moment(item.date_lcto).format('DD/MM/YYYY'), time: moment(item.date_lcto).format('HH:mm'), totCredito: ('R$ ' + item.totCredito), totDebito: ('R$ ' + item.totDebito) }]
                }
            })
            setArrLctos(newArr)
        }
        loadList(String(params.Id))
    }, [arrAux.length])

    return (
        <div className='container--financial-new'>
            <div className='formDetail'>
                <div className="topBar">
                    <div className="topBar-interno">
                        <div className="topBar-inputs">
                            <div className="boxDtCad">
                                <label htmlFor="ipt-dtCad">Total Créditos</label><br />
                                <input
                                    value={'R$ ' + totCred}
                                    style={{ backgroundColor: '#11adc2', color: 'white' }}
                                    className='ipt-dtCad'
                                    type="text"
                                    disabled
                                />
                            </div>
                            <div className="boxDtCad">
                                <label htmlFor="ipt-dtCad">Total Débitos</label><br />
                                <input
                                    value={'R$ ' + totDeb}
                                    style={{ backgroundColor: '#ad2a2a', color: 'white' }}
                                    className='ipt-dtCad'
                                    type="text"
                                    disabled
                                />
                            </div>
                            <div className="boxBalance">
                                <label htmlFor="ipt-balance">Balanço</label><br />
                                <input
                                    type="text"
                                    className='ipt-balance'
                                    defaultValue={'R$' + `${(balance)}`}
                                    style={balance > 0 ? { backgroundColor: '#16a685', color: 'white' } : balance < 0 ? { backgroundColor: '#ad2a2a', color: 'white' } : { backgroundColor: '#b89b2a' }}
                                />
                            </div>
                        </div>
                        <div className="topBar-Btn">
                            <Link to={'/bank'}>
                                <input type="button" value="Cancelar" className='btnCancelar' />
                            </Link>
                        </div>
                    </div>
                </div>
                <fieldset className='middleFieldset'>
                    <legend>
                        .::Dados bancários automáticos::.
                    </legend>
                    <div className="middleBar">
                        <div className="middleBar-interno">
                            <div className="boxIdBank">
                                <label htmlFor="ipt-idBank">Id Banco</label><br />
                                <input
                                    className='ipt-idBank'
                                    type="text"
                                    name='idBank'
                                    value={idBank}
                                    disabled
                                />
                            </div>
                            <div className="boxNameBank">
                                <label htmlFor="ipt-nameBank">Nome Banco</label><br />
                                <input
                                    className='ipt-nameBank'
                                    type="text"
                                    name='nameBank'
                                    value={nameBank}
                                    disabled

                                />
                            </div>
                            <div className="boxAgency">
                                <label htmlFor="ipt-agency">Agência</label><br />
                                <input
                                    className='ipt-agency'
                                    type="text"
                                    value={agency}
                                    disabled
                                />
                            </div>
                            <div className="boxAccount">
                                <label htmlFor="ipt-account">Conta</label><br />
                                <input
                                    className='ipt-account'
                                    type="text"
                                    value={account}
                                    disabled
                                />
                            </div>
                            <fieldset className='fieldset--list-lcto'>
                                <legend>Lançamentos Financeiros</legend>
                                <div className="boxAddItens">
                                    <table className='lctoFinancial'>
                                        <thead className='divThead'>
                                            <tr className='trHeadFinancialNew'>
                                                <th style={{ flex: '0.8' }}>Lançamento</th>
                                                <th style={{ flex: '0.9' }}>Data</th>
                                                <th style={{ flex: '0.8' }}>Hora</th>
                                                <th style={{ flex: '0.8' }}>Total Crédito</th>
                                                <th style={{ flex: '1' }}>Total Débito</th>
                                            </tr>
                                        </thead>
                                        <tbody className='divScroll' style={{ overflowY: 'scroll', height: '370px' }}>
                                            {
                                                arrLctos.map((item, index) => (
                                                    <tr className='tableRow' key={index}>
                                                        <td>
                                                            <input
                                                                style={{ width: '238px' }}
                                                                className='tbDate-new'
                                                                type="text"
                                                                defaultValue={item.idLcto}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                style={{ width: '238px' }}
                                                                className='tbDate-new'
                                                                type="text"
                                                                defaultValue={item.date}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                style={{ width: '238px' }}
                                                                className='tbDate-new'
                                                                type="text"
                                                                defaultValue={item.time}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                style={{ width: '238px' }}
                                                                className='tbDescription-lcto'
                                                                type="text"
                                                                defaultValue={item.totCredito}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                style={{ width: '238px' }}
                                                                className='tbType-new'
                                                                type="text"
                                                                defaultValue={item.totDebito}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <Link className="link" to={`/financial/${item.idLcto}`}>
                                                                <input
                                                                    className='btnDel-new'
                                                                    type="button"
                                                                    value="="
                                                                />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>

                                </div>
                            </fieldset>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}