import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './lctosingle.scss'
import swal from 'sweetalert'
import { stock } from '../../../api/apiStock';
import { stockUpdate } from '../../../api/apiUpdateStock';

type ArrProduct = {
    idProduct: number,
    sku: string,
    description: string,
    cost: string,
    costTot: string
    validity: string,
    qtd: number,
    ItensStockUpdateModel: {
        qtd: number,
        valUnit: number,
        valTot: number
    }
}

export const LctoSingle = () => {

    const params = useParams()

    //Dados do lançamento
    const [id, setId] = useState(String)
    const [dtCad, setDtCad] = useState(String)
    const [nf, setNf] = useState(0)
    const [qtdItens, setQtdItens] = useState(0)
    const [amount, setAmount] = useState(String)
    const [donation, setDonation] = useState(-1)
    const [withdraw, setWithdraw] = useState(String)
    const [user, setUser] = useState(String)
    const [provider, setProvider] = useState(String)
    const [bankId, setBankId] = useState(Number)
    const [bankName, setBankName] = useState(String)

    //Dados do produto para get e set no array que é iterado para exibir na tela e enviado ao backend
    const [idProduct, setIdProduct] = useState(Number)
    const [sku, setSku] = useState('')
    const [qtd, setQtd] = useState(0)
    const [description, setDescription] = useState(String)
    const [cost, setCost] = useState(String)
    const [qtdOld, setQtdOld] = useState(Number)
    const [qtdUpdate, setQtdUpdate] = useState<number[]>([])
    const [validity, setValidity] = useState(String)
    const [productsLcto, setProductsLcto] = useState<ArrProduct[]>([])

    //get header lcto
    useEffect(() => {
        if (params.Id) {
            const loadUpdate = async (id: string) => {
                let res = await stockUpdate.getUpdate(id)
                if (res.success) {
                    setId(("000000" + res.data.id).slice(-6))
                    console.log(res.data.date)
                    setDtCad(moment(res.data.date).format('DD/MM/YYYY'))
                    setNf(res.data.nf)
                    setQtdItens(res.data.qtd_itens)
                    setAmount(res.data.amount)
                    setDonation(res.data.donation)
                    setUser(res.data.user)
                    setProvider(res.data.provider)
                    setWithdraw(res.data.withdraw)
                    setProductsLcto(res.data.Stock)
                    setBankId(res.data.id_bank)
                    setBankName(res.data.BankModel?.name_bank)
                } else {
                    swal("Ops ", "" + 'Cadastro Não Encontrado', "error")
                        .then(() => {
                            window.location.href = '/lctos'
                        })
                }
            }
            loadUpdate(params.Id)
        }
    }, [])


    //Busca de produtos através do SKU
    const getProduct = async (sku: string) => {
        if (sku && sku != '') {
            let json = await stock.getProductSku(id)
            if (json.success) {
                setIdProduct(json.data.id)
                setDescription(json.data.description)
                //setCost(json.data.cost)
                setValidity(json.data.validity)
                setQtdOld(json.data.qtd)
            } else {
                alert('Produto Não Encontrado')
                setSku('')
            }
        } else {
            return
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
                            <div className="boxId">
                                <label htmlFor="ipt-id">Código</label><br />
                                <input
                                    className='ipt-id'
                                    type="text"
                                    value={id}
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
                            <Link to={'/lctos'}>
                                <input type="button" value="Voltar" className='btnCancelar' />
                            </Link>
                        </div>
                    </div>
                </div>
                <fieldset className='middleFieldset'>
                    <legend>
                        .::Preencha com o máximo de informações possíveis::.
                    </legend>
                    <div className="middleBar">
                        <div className="middleBar-interno">
                            <div className="boxUser">
                                <label htmlFor="ipt-user">Usuário</label><br />
                                <input
                                    className='ipt-user'
                                    type="text"
                                    name='user'
                                    value={user}
                                    disabled
                                    onChange={
                                        (e) => setUser(e.target.value)
                                    }
                                />
                            </div>
                            <div className="boxNf">
                                <label htmlFor="ipt-nf">Nota Fiscal</label><br />
                                <input
                                    className='ipt-nf'
                                    type="text"
                                    value={nf}
                                    disabled
                                    name='nf'
                                    onChange={
                                        (e) => setNf(parseInt(e.target.value))
                                    }

                                />
                            </div>
                            <div className="boxAmount">
                                <label htmlFor="ipt-amount">Valor Total do Lançamento</label><br />
                                <input
                                    className='ipt-amount'
                                    type="text"
                                    step={'0.01'}
                                    value={'R$ ' + amount}
                                    disabled
                                    onChange={(e) => { setAmount(e.target.value) }}
                                    onBlur={() => setAmount('R$ ' + amount)}
                                    onFocus={() => setAmount('')}
                                />
                            </div>
                            <div className="boxQtd">
                                <label htmlFor="ipt-qtd">Qtd. Itens</label><br />
                                <input
                                    className='ipt-qtd'
                                    type="text"
                                    value={qtdItens}
                                    disabled
                                    onChange={
                                        (e) => setQtdItens(parseInt(e.target.value))
                                    }
                                />
                            </div>
                            <div className="boxDonation">
                                <label htmlFor="ipt-donation">Doação?</label><br />
                                <select
                                    className='ipt-donation'
                                    name="donation"
                                    value={donation}
                                    id="donation"
                                    disabled
                                    onChange={(e) => setDonation(parseInt(e.target.value))}
                                >
                                    <option disabled>...</option>
                                    <option value="0">Não</option>
                                    <option value="1">Sim</option>
                                </select>
                            </div>
                            <div className="boxWithdraw">
                                <label htmlFor="ipt-withdraw">Sacar de </label><br />
                                <input 
                                    type="text" 
                                    className='withdraw'
                                    defaultValue={bankId !== null ? bankName : 'DOAÇÃO'}
                                    disabled
                                />
                            </div>
                            <div className="boxProvider">
                                <label htmlFor="ipt-provider">Fornecedor</label><br />
                                <input
                                    className='ipt-provider'
                                    type="text"
                                    value={provider}
                                    disabled
                                    onChange={
                                        (e) => setProvider(e.target.value)
                                    }
                                />
                            </div>
                            <fieldset className='fieldset--category-brand'>
                                <legend>Itens do Estoque</legend>
                                <div className="boxAddItens">
                                    <table className='lctoProductsTable'>
                                        <thead>
                                            <tr className='trHead'>
                                                <th>SKU</th>
                                                <th>Descrição</th>
                                                <th>Custo Unit</th>
                                                <th>Custo Total</th>
                                                <th>Validade</th>
                                                <th>Quantidade</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                productsLcto.map((item, index) => (
                                                    <tr className='tableRow' key={index}>
                                                        <td>
                                                            <input
                                                                className='tbSku'
                                                                type="text"
                                                                value={item.sku}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                className='tbDescription'
                                                                type="text"
                                                                value={item.description}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                className='tbCostUnit'
                                                                type="text"
                                                                value={item.cost}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                className='tbCostTot'
                                                                type="text"
                                                                value={item.ItensStockUpdateModel.valTot}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="date"
                                                                value={item.validity}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                value={item.ItensStockUpdateModel.qtd}
                                                                disabled
                                                            />
                                                        </td>
                                                        {/* <td>
                                                            <input
                                                                className='btnDel'
                                                                type="button"
                                                                value="X"
                                                                onClick={() => delProduct(item.sku, item.idProduct, item.qtd, item.costTot)}
                                                            />
                                                        </td> */}
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