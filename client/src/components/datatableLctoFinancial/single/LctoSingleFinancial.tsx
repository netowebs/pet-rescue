//import PrintIcon from '@mui/icons-material/Print';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './lctosinglefinancial.scss'
import swal from 'sweetalert'
import { bank } from '../../../api/apiBank';
import { Bank } from '../../../types/typeBank';
import { lctoFinancial } from '../../../api/apiLctoFinancial';
import { rowsLctoFinancial } from '../../../api/apiRowsLcto';

type ArrPivoFinancial = {
    idBank: string,
    type: string,
    value: string,
    description: string
}

export const LctoSingleFinancial = () => {

    const params = useParams()

    //State Lançamento
    const [dtCad, setDtCad] = useState(String)
    const [user, setUser] = useState(String)

    //State Banco
    const [idCad, setIdCad] = useState(String)
    const [banks, setBanks] = useState<Bank[]>([])
    const [idBankDb, setIdBankDb] = useState(Number)
    const [idBank, setIdBank] = useState(String)
    const [nameBank, setNameBank] = useState(String)
    const [agency, setAgency] = useState(String)
    const [account, setAccount] = useState(String)
    const [balance, setBalance] = useState(Number)
    const [totCredito, setTotCredito] = useState(Number)
    const [totDebito, setTotDebito] = useState(Number)

    //State Lcto Financial
    const [description, setDescription] = useState(String)
    const [type, setType] = useState(String)
    const [value, setValue] = useState(String)

    useEffect(() => {
        if (params.Id) {
            const loadLcto = async (id: string) => {
                let json = await lctoFinancial.getLcto(id)
                if (json.success) {
                    setTotCredito(json.data.totCredito)
                    setTotDebito(json.data.totDebito)
                    setIdBankDb(json.data.id_bank)
                    setIdCad(("000000" + json.data.id).slice(-6))
                    setUser(json.data.user)
                    setDtCad(moment(json.data.date_lcto).format('DD/MM/YYYY'))
                    setIdBank(("000" + json.data.code_bank).slice(-3))
                    setNameBank(json.data.name_bank)
                    setAgency(json.data.agency)
                    setAccount(json.data.account)
                    getLctos(parseInt(json.data.id))
                }
            }
            loadLcto(params.Id)
        }

    }, [])

    //Array tabela pivo
    const [arrLctos, setArrLctos] = useState<ArrPivoFinancial[]>([])

    const getLctos = async (id: number) => {
        let newArr = [...arrLctos]
        let json = await rowsLctoFinancial.getLcto(id)
        json.data.map((item: any) => {
            newArr = [...newArr, { idBank: item.id_bank, description: item.description, type: item.ttype, value: ('R$' + item.vvalue.toString()) }]
        })
        setArrLctos(newArr)
    }

    const addLcto = (description: string, type: string) => {
        const valueFloat = parseFloat(value.replace(/[R$]/g, '').replace(/[',']/, '.'))
        if (type.trim() === 'credito') {
            setTotCredito(totCredito + valueFloat)
        } else {
            setTotDebito(totDebito + valueFloat)
        }
        let pivoAux = ([...arrLctos, { idBank, description, type, value }])
        setArrLctos(pivoAux)
        setDescription('')
        setValue('')
    }

    const delLcto = (idx: number, value: string, type: string) => {
        const valueFloat = parseFloat(value.replace(/[R$]/g, '').replace(/[',']/, '.'))
        if (type.trim() === 'credito') {
            setTotCredito(totCredito - valueFloat)
        } else {
            setTotDebito(totDebito - valueFloat)
        }
        let newArr = [...arrLctos]
        newArr.splice(idx, 1)
        setArrLctos(newArr)
    }

    const handleCreate = async () => {
        let id = parseInt(idCad)
        console.log(idCad)
        const data: any = { arrLctos, user, dtCad, idBank, nameBank, agency, account, id, totCredito, totDebito, idBankDb }

        if (user.trim() !== '' && idBank.trim() !== '' && arrLctos.length > 0) {
            const res = await lctoFinancial.updateLcto(data)
            if (res.success) {
                swal(res.message, " ", "success")
                    .then(() => {
                        arrLctos.forEach(async (item) => {
                            await bank.getBankCode(item.idBank.toString())
                        })
                    })
                    .then(() => {
                        window.location.href = '/financial'
                    })
            } else {
                swal("Error !", "" + JSON.stringify(res.message), "error")
            }
        } else {
            alert('Preencha todos os campos')
        }
    }

    useEffect(() => {
        setDtCad(moment().format('DD/MM/YYYY'))
    }, [dtCad])

    return (
        <div className='container--financial-new'>
            <div className='formDetail'>
                <div className="topBar">
                    <div className="topBar-interno">
                        <div className="topBar-inputs">
                            <div className="boxUser">
                                <label htmlFor="ipt-user">Usuário</label><br />
                                <input
                                    className='ipt-user'
                                    type="text"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                />
                            </div>
                            <div className="boxDtCad">
                                <label htmlFor="ipt-dtCad">Data do Lançamento</label><br />
                                <input
                                    defaultValue={dtCad}
                                    className='ipt-dtCad'
                                    type="text"
                                    disabled
                                />
                            </div>
                            <div className="boxIdLcto">
                                <label htmlFor="ipt-idLcto">Código do Lançamento</label><br />
                                <input
                                    className='ipt-idLcto'
                                    type="text"
                                    defaultValue={idCad}
                                />
                            </div>
                        </div>
                        <div className="topBar-Btn">
                            <input type="submit" value="Salvar" className='btnSalvar' onClick={() => handleCreate()} />
                            <Link to={'/financial'}>
                                <input type="button" value="Cancelar" className='btnCancelar' />
                            </Link>
                            {/* <input type="button" value="Excluir" className='btnExcluir' onClick={() => handleDelete()} /> */}
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
                                    defaultValue={idBank}
                                    disabled
                                />
                            </div>
                            <div className="boxNameBank">
                                <label htmlFor="ipt-nameBank">Nome Banco</label><br />
                                <input
                                    className='ipt-nameBank'
                                    type="text"
                                    name='nameBank'
                                    defaultValue={nameBank}
                                    disabled

                                />
                            </div>
                            <div className="boxAgency">
                                <label htmlFor="ipt-agency">Agência</label><br />
                                <input
                                    className='ipt-agency'
                                    type="text"
                                    defaultValue={agency}
                                    disabled
                                />
                            </div>
                            <div className="boxAccount">
                                <label htmlFor="ipt-account">Conta</label><br />
                                <input
                                    className='ipt-account'
                                    type="text"
                                    defaultValue={account}
                                    disabled
                                />
                            </div>
                            <fieldset className='fieldset--category-brand'>
                                <legend>Lançamentos Financeiros</legend>
                                <div className="boxAddItens">
                                    <div className='container-financialLcto'>
                                        <input
                                            className='iptDescription-new'
                                            type="text"
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder={'Descrição...'}
                                            value={description}
                                        />
                                        <select
                                            name="iptType-new"
                                            className='iptType-new'
                                            defaultValue={'Selecione...'}
                                            onChange={(e) => setType(e.target.value)}
                                        >
                                            <option disabled>Selecione...</option>
                                            <option value="credito">Crédito</option>
                                            <option value="debito">Débito</option>
                                        </select>

                                        <input
                                            type="string"
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                            placeholder={'Valor...'}
                                            onBlur={() => setValue('R$ ' + value)}
                                            onFocus={() => setValue('')}
                                        />
                                        <button
                                            className='btn-insertLcto'
                                            onClick={() => addLcto(description, type)}
                                        >
                                            Inserir
                                        </button>
                                    </div>
                                    <table className='lctoFinancial'>
                                        <thead className='divThead'>
                                                <tr className='trHeadFinancialNew'>
                                                    <th style={{ flex: '3.85' }}>Descrição</th>
                                                    <th style={{ flex: '1' }}>Tipo</th>
                                                    <th style={{ flex: '1.5' }}>Valor</th>
                                                </tr>
                                        </thead>
                                        <tbody className='divScroll' style={{ overflowY: 'scroll', height: '213px' }}>
                                            {
                                                arrLctos.map((item, index) => (
                                                    <tr className='tableRow' key={index}>
                                                        <td>
                                                            <input
                                                                className='tbDescription-new'
                                                                type="text"
                                                                value={item.description}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                className='tbType-new'
                                                                type="text"
                                                                value={item.type}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                className='tbValue-new'
                                                                type="text"
                                                                value={item.value}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                className='btnDel-new'
                                                                type="button"
                                                                value="X"
                                                                onClick={() => delLcto(index, item.value, item.type)}
                                                            />
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