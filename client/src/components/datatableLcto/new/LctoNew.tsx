//import PrintIcon from '@mui/icons-material/Print';
import { MenuItem } from '@mui/material';
import moment from 'moment';
import React, { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import './lctonew.scss'
import swal from 'sweetalert'
import { stock } from '../../../api/apiStock';
import { useCategoryProduct } from '../../hooks/useCategoryProduct';
import { useBrandProduct } from '../../hooks/useBrandProduct';
import { stockUpdate } from '../../../api/apiUpdateStock';
//import { PaginatedList } from 'react-paginated-list';

type ArrProduct = {
    idProduct: number,
    sku: string,
    description: string,
    cost: string,
    validity: string,
    qtd: number
}

export const LctoNew = () => {

    const params = useParams()

    //Dados do lançamento
    const [dtCad, setDtCad] = useState(String)
    const [nf, setNf] = useState(Number)
    const [qtdItens, setQtdItens] = useState(Number)
    const [amount, setAmount] = useState(Number)
    const [donation, setDonation] = useState(Number)
    const [withdraw, setWithdraw] = useState(String)
    const [user, setUser] = useState(String)
    const [provider, setProvider] = useState(String)

    //Dados do produto
    const [arrProduct, setArrProduct] = useState<Number[]>([])
    const [idProduct, setIdProduct] = useState(Number)
    const [sku, setSku] = useState('')
    const [qtd, setQtd] = useState(Number)
    const [description, setDescription] = useState(String)
    const [cost, setCost] = useState(String)
    const [validity, setValidity] = useState(String)
    const [productsLcto, setProductsLcto] = useState<ArrProduct[]>([])

    const getProduct = async (sku: string) => {
        if (sku && sku != '') {
            let json = await stock.getProductSku(sku)
            if(json.success){
                setIdProduct(json.data.id)
                setDescription(json.data.description)
                setCost(json.data.cost)
                setValidity(json.data.validity)
            }else{
                alert('Produto Não Encontrado')
                setSku('')
            }
            
        }else{
            
        }
    }

    const addProduct = (sku: string, description: string) => {
        if (sku) {
            setTimeout(() => {
                let index = productsLcto.map(item => item.sku).indexOf(sku)
                if (index > -1) {
                    alert('Produto consta na listagem')
                } else {
                    let newArr = ([...productsLcto, { idProduct, sku, description, cost, qtd, validity }])
                    setProductsLcto([...newArr])
                    setArrProduct(arrProduct => [...arrProduct, idProduct])
                }})
            setSku('')
            setDescription('')
            setCost('')
            setValidity('')
            setQtd(0)
        }
    }

    const delProduct = (sku: string, id: number) => {
        if (sku) {
            let newArr = [...productsLcto]
            let arrBack = [...arrProduct]
            
            setTimeout(() => {
                const index = productsLcto.map(item => item.sku).indexOf(sku)
                if (index !== -1) {
                    newArr.splice(index, 1)
                    setProductsLcto(newArr)
                    const indexArrBack = arrProduct.map(item => item).indexOf(id)
                    if(indexArrBack !== -1){
                        arrBack.splice(indexArrBack, 1)
                        setArrProduct(arrBack)
                    }
                    
                } else {
                    console.log('Caiu no Else')
                }
            }, 100)
        }
        console.log('idProduct', id)
    }

    useEffect(()=>{
        console.log('ID Product',productsLcto.map(item => item.idProduct))
        console.log('ID Qtd',productsLcto.map(item => item.qtd))
        console.log('ID Custo',productsLcto.map(item => item.cost))
        console.log('ID Validity',productsLcto.map(item => item.validity))
        console.log('arrayProduct',...productsLcto)
        console.log('arrayBackend', ...arrProduct)
    }, [productsLcto])


    const handleCreate = async () => {
        const data: any = { arrProduct, dtCad, nf, qtdItens, amount, donation, withdraw, user, ...productsLcto }

        if (qtdItens == null || amount == null || donation === null || withdraw == '' || user == '' || idProduct == null || dtCad == '') {
            alert('Existem campos vazios')
        } else {
            const res = await stockUpdate.createUpdate(data)
            if (res.success) {
                swal(res.message, " ", "success")
                .then(()=>{
                    productsLcto.forEach(async (item) =>{
                        await stock.updateProductLcto(item)
                    })
                })
                    .then(() => {
                        window.location.href = '/lcto'
                    })
            } else {
                swal("Error !", "" + JSON.stringify(res.message), "error")
            }
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
                            <Link to={'/lcto'}>
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
                                <label htmlFor="ipt-amount">Valor Total</label><br />
                                <input
                                    className='ipt-amount'
                                    type="text"
                                    onChange={
                                        (e) => setAmount(parseFloat(e.target.value))
                                    }
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
                                    id="donation"
                                    onChange={(e) => setDonation(parseInt(e.target.value))}
                                >
                                    <option value="0">Não</option>
                                    <option value="1">Sim</option>
                                </select>
                            </div>
                            <div className="boxWithdraw">
                                <label htmlFor="ipt-withdraw">Sacar de </label><br />
                                <select 
                                    name="withdraw" 
                                    id="withdraw"
                                    defaultValue={'Selecione...'}
                                    onChange={(e) => setWithdraw(e.target.value)}
                                >
                                    <option disabled>SELECIONE...</option>
                                    <option value="DINHEIRO">Dinheiro</option>
                                    <option value="BANCO DO BRASIL">Banco Brasil</option>
                                    <option value="CAIXA FEDERAL">Caixa Federal</option>
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
                                            className='iptSku'
                                            type="text"
                                            onChange={(e) => setSku(e.target.value)}
                                            placeholder={'Código...'}
                                            onBlur={() => getProduct(sku)}
                                            value={sku}
                                        />
                                        <input
                                            className='iptDescription'
                                            type="text"
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder={'Descrição...'}
                                            value={description}
                                        />
                                        <input
                                            type="text"
                                            onChange={(e) => setCost(e.target.value)}
                                            placeholder={'Custo...'}
                                            value={cost}
                                        />
                                        <input
                                            type="date"
                                            onChange={(e) => setValidity(e.target.value)}
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
                                            onClick={() => addProduct(sku, description)}
                                        >
                                            Inserir
                                        </button>
                                    </div>
                                    <table className='lctoProductsTable'>
                                        <thead>
                                            <tr className='trHead'>
                                                <th>SKU</th>
                                                <th>Descrição</th>
                                                <th>Custo</th>
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
                                                                defaultValue={item.sku}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                className='tbDescription'
                                                                type="text"
                                                                defaultValue={item.description}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                defaultValue={item.cost}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="date"
                                                                defaultValue={item.validity}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                defaultValue={item.qtd}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                className='btnDel'
                                                                type="button"
                                                                value="X"
                                                                onClick={() => delProduct(item.sku, item.idProduct)}
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