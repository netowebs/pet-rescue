import moment from 'moment';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './lctonew.scss'
import swal from 'sweetalert'
import { stock } from '../../../api/apiStock';
import { stockUpdate } from '../../../api/apiUpdateStock';
import { bank } from '../../../api/apiBank';
import { Bank } from '../../../types/typeBank';

export type ArrProduct = {
    idProduct: number,
    sku: string,
    description: string,
    cost: string,
    costTot: string
    validity: string,
    qtd: number
}

type ArrPivo = {
    sku: string
    qtdPivo: number,
    valUnit: number,
    valTot: number
}

export const LctoNew = () => {

    //Dados do lançamento
    const [dtCad, setDtCad] = useState(String)
    const [nf, setNf] = useState(0)
    const [qtdItens, setQtdItens] = useState(0)
    const [amount, setAmount] = useState(String)
    const [donation, setDonation] = useState(-1)
    const [user, setUser] = useState(String)
    const [provider, setProvider] = useState(String)
    const [bankList, setBankList] = useState<Bank[]>([])
    const [bankId, setBankId] = useState(Number)

    //Array tabela pivo
    const [arrProduct, setArrProduct] = useState<number[]>([])
    const [addArrPivo, setAddArrPivo] = useState<ArrPivo[]>([])

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
    const [somaQtd, setSomaQtd] = useState(Number)
    const [somaValue, setSomaValue] = useState(Number)

    useEffect(() => {
        const loadBanks = async () => {
            let json = await bank.getAllBanks()
            if(json){
                setBankList(json)
            }
        }
        loadBanks()
    },[])

    //Busca de produtos através do SKU
    const getProduct = async (sku: string) => {
        if (sku && sku != '') {
            let json = await stock.getProductSku(sku)
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

    const addProduct = (sku: string, description: string, costTot: string, custo: string) => {
        if (sku) {
            if (cost === '') {
                setCost('0')
            }
            if (qtd <= 0) {
                alert('Quantidade não pode ser menor ou igual a zero')
            } else {
                let index = productsLcto.map(item => item.sku).indexOf(sku)
                if (index > -1) {
                    alert('Produto consta na listagem')
                } else {
                    let pivoAux = ([...addArrPivo, {sku, qtdPivo: qtd, valUnit: (parseFloat(custo.replace(/[R$]/g, '').replace(/[',']/, '.'))), valTot: (parseFloat(custo.replace(/[R$]/g, '').replace(/[',']/, '.')))*qtd }])
                    setAddArrPivo(pivoAux)
                    setSomaQtd(somaQtd + qtd)
                    setSomaValue(somaValue + parseFloat(costTot.replace(/[R$]/g, '').replace(/[',']/, '.')))
                    let newArr = ([...productsLcto, { idProduct, sku, description, cost, costTot, qtd, validity}])
                    setProductsLcto(newArr)
                    setArrProduct(arrProduct => [...arrProduct, idProduct])
                    setQtdUpdate(qtdUpdate => [...qtdUpdate, (qtd + qtdOld)])
                }
                setSku('')
                setDescription('')
                setCost('')
                setValidity('')
                setQtd(0)
            }
        }
    }

    //Função que valida data vencimento
    //Não pode lançar um produto com vencimento anterior ao dia atual
    const handleValidity = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.value < moment().format('YYYY-MM-DD')) {
            alert('Dia Inválido')
        } else {
            setValidity(e.target.value)
        }
    }

    const delProduct = (sku: string, id: number, qtd: number, costTot: string) => {
        let newArr = [...productsLcto]
        let arrBack = [...arrProduct]

        setTimeout(() => {
            const index = productsLcto.map(item => item.sku).indexOf(sku)
            if (index !== -1) {
                newArr.splice(index, 1)
                setProductsLcto(newArr)
                setSomaQtd(somaQtd - qtd)
                setSomaValue(somaValue - parseFloat(costTot.replace(/[R$]/g, '').replace(/[',']/, '.')))
                const indexArrBack = arrProduct.map(item => item).indexOf(id)
                if (indexArrBack !== -1) {
                    arrBack.splice(indexArrBack, 1)
                    setArrProduct(arrBack)
                    qtdUpdate.splice(index, 1)
                    setQtdUpdate([...qtdUpdate])
                    addArrPivo.splice(index, 1)
                    setAddArrPivo([...addArrPivo])
                }
            } else {
                return
            }
        }, 100)
    }

    const handleCreate = async () => {
        const amountNum = parseFloat(amount.replace(/[R$]/g, '').replace(/[',']/, '.'))
        const data: any = { addArrPivo, arrProduct, dtCad, nf, qtdItens, amountNum, bankId, donation, user, provider, ...productsLcto }

        if (nf !== null && nf !== 0 && qtdItens >= 0 && amountNum !== 0 && user.trim() !== '' && donation === 1 || donation === 0) {
            if (qtdItens === somaQtd && somaValue === amountNum) {
                productsLcto.forEach((item, index) => {
                    item.qtd = qtdUpdate[index]
                })
                const res = await stockUpdate.createUpdate(data)
                if (res.success) {
                    swal(res.message, " ", "success")
                        .then(() => {
                            productsLcto.forEach(async (item) => {
                                await stock.updateProductLcto(item)
                            })
                        })
                        .then(() => {
                            window.location.href = '/lctos'
                        })
                } else {
                    swal("Error !", "" + JSON.stringify(res.message), "error")
                }
            } else {
                alert('Quantidades e/ou valores dos itens estão diferentes dos totais informados')
            }
        } else {
            alert('Preencha todos os campos')
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
                            <Link to={'/lctos'}>
                                <input type="button" value="Cancelar" className='btnCancelar' />
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
                                    value={amount}
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
                                    defaultValue={'...'}
                                    id="donation"
                                    onChange={(e) => setDonation(parseInt(e.target.value))}
                                >
                                    <option disabled>...</option>
                                    <option value="0">Não</option>
                                    <option value="1">Sim</option>
                                </select>
                            </div>
                            <div className="boxWithdraw">
                                <label htmlFor="ipt-withdraw">Sacar de </label><br />
                                <select
                                    name="withdraw"
                                    id="withdraw"
                                    defaultValue={'SELECIONE...'}
                                    onChange={(e) => setBankId(parseInt(e.target.value))}
                                    disabled={donation === 0 ? false : true}
                                >
                                    <option disabled>SELECIONE...</option>
                                    {
                                        bankList.map((item, index) => (
                                            <option key={index} value={item.id}>{item.name_bank}</option>
                                        ))
                                    }
                                    {/* <option disabled>SELECIONE...</option>
                                    <option value="DINHEIRO">Dinheiro</option>
                                    <option value="BANCO DO BRASIL">Banco Brasil</option>
                                    <option value="CAIXA FEDERAL">Caixa Federal</option> */}
                                </select>
                            </div>
                            <div className="boxProvider">
                                <label htmlFor="ipt-provider">Fornecedor</label><br />
                                <input
                                    className='ipt-provider'
                                    type="text"
                                    onChange={
                                        (e) => setProvider(e.target.value)
                                    }
                                />
                            </div>
                            <fieldset className='fieldset--category-brand'>
                                <legend>Itens do Estoque</legend>
                                <div className="boxAddItens">
                                    <div className='container-itemLcto'>
                                        <input
                                            className='iptSku-new'
                                            type="text"
                                            onChange={(e) => setSku(e.target.value)}
                                            placeholder={'Código...'}
                                            onBlur={() => getProduct(sku)}
                                            value={sku}
                                        />
                                        <input
                                            className='iptDescription-new'
                                            type="text"
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder={'Descrição...'}
                                            defaultValue={description}
                                            disabled
                                        />
                                        <input
                                            type="text"
                                            value={cost}
                                            onChange={(e) => setCost(e.target.value)}
                                            placeholder={'Custo...'}
                                            onBlur={() => setCost('R$ ' + cost)}
                                            onFocus={() => ''}

                                        />
                                        <input
                                            type="date"
                                            min={moment().format('YYYY-MM-DD')}
                                            onChange={handleValidity}
                                            onKeyDown={(e) => e.key !== 'Tab' ? e.preventDefault : null}
                                            placeholder={'Validade...'}
                                            value={validity}
                                        />
                                        <input
                                            type="text"
                                            onChange={(e) => setQtd(parseInt(e.target.value))}
                                            placeholder={'Quantidade...'}
                                            value={qtd}
                                        />
                                        <button
                                            onClick={() => addProduct(sku, description, 'R$ ' + ((parseFloat(cost.replace(/[R$]/g, '').replace(/[',']/, '.')) * qtd).toFixed(2).toString()), cost)}
                                        >
                                            Inserir
                                        </button>
                                    </div>
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
                                                                className='tbSku-new'
                                                                type="text"
                                                                value={item.sku}
                                                                disabled
                                                            />
                                                        </td>
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
                                                                className='tbCostUnit-new'
                                                                type="text"
                                                                value={item.cost}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                className='tbCostTot-new'
                                                                type="text"
                                                                value={item.costTot}
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
                                                                value={item.qtd}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                className='btnDel-new'
                                                                type="button"
                                                                value="X"
                                                                onClick={() => delProduct(item.sku, item.idProduct, item.qtd, item.costTot)}
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