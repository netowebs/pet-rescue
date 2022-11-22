import moment from 'moment';
import React, { useState, useEffect, useContext } from 'react';
import { stock } from '../../../api/apiStock';
import { AuthContext } from '../../../contexts/Auth/AuthContex';
import { ItensList } from '../../../types/typeItensList';
import { VetList } from '../../../types/typeVetList';
import { UpdateStock } from '../single/MedicalRecordsSingle';
import './itenstab.scss'


type Prop = {
    list: ItensList[]
    vetList: VetList[]
    vetResp: VetList
    setList: React.Dispatch<React.SetStateAction<ItensList[]>>
    idProducts: number[]
    setIdProducts: React.Dispatch<React.SetStateAction<number[]>>
    vetIdList: number[]
    setVetIdList: React.Dispatch<React.SetStateAction<number[]>>
    user: string
    statusMr: number
    setQtdMedical: React.Dispatch<React.SetStateAction<number[]>>
    setQtdStock: React.Dispatch<React.SetStateAction<UpdateStock[]>>
    qtdMedical: number[]
    qtdStock: UpdateStock[]
}


export const ItensTab = ({ list, vetList, vetResp, setList, idProducts, setIdProducts, vetIdList, setVetIdList, user, statusMr, qtdMedical, qtdStock, setQtdMedical, setQtdStock }: Prop) => {

    const auth = useContext(AuthContext)

    const [idProd, setIdProd] = useState(Number)
    const [skuProduct, setSkuProduct] = useState(String)
    const [descProduct, setDescProduct] = useState(String)
    const [qtdProduct, setQtdProduct] = useState(Number)
    const [oldQtdd, setOldQtdd] = useState(Number)
    const [vetProduct, setVetProduct] = useState(vetResp.name)
    const [vetIdProd, setVetIdProd] = useState(vetResp.id)
    const [userProduct, setUserProduct] = useState(auth.user?.username!)
    const [dateProduct, setDateProduct] = useState(Date)

    //Busca de produtos através do SKU
    const getProduct = async (sku: string) => {
        let json = await stock.getProductSku(sku)
        if (json.success) {
            setIdProd(json.data.id)
            setSkuProduct(json.data.sku)
            setDescProduct(json.data.description)
            setOldQtdd(json.data.qtd)
        } else if (skuProduct.trim() !== '') {
            alert('Produto Não Encontrado')
            setSkuProduct('')
            setDescProduct('')
            setQtdProduct(0)
            setUserProduct('')
        }
    }

    const defaultInput = () => {
        setSkuProduct('')
        setDescProduct('')
        setQtdProduct(0)
        setUserProduct('')
        setVetProduct(vetResp.name)
    }

    const auxAddProduct = () => {
        let oldQtd = 0
        if (vetList) {
            if (qtdProduct > 0) {
                vetList.forEach(item => item.name === vetProduct ? setVetIdProd(item.id) : null)
                for (let i in vetList) {
                    if (vetList[i].name === vetProduct)
                        setVetIdList([...vetIdList, vetList[i].id])
                }
                let newArr = ([...list, { id: idProd, sku: skuProduct, description: descProduct, qtdProduct, vetProduct: vetProduct, userProduct: userProduct, vetIdProduct: vetIdProd, itensMedicalRecordsModel: { qtd: (qtdProduct + oldQtd), date: dateProduct, user: userProduct, id_vet: vetIdProd, name_vet: vetProduct } }])
                setList(newArr)
                let newIds = ([...newArr.map(item => item.id)])
                setIdProducts(newIds)
                setQtdMedical([...qtdMedical, qtdProduct])

            } else {
                alert('Quantidade não pode ser Zero')
            }
        } else {
            alert('Selecione o veterinário')
            defaultInput()
        }
    }

    const addProduct = (id: string) => {
        if (id) {
            if ((oldQtdd - qtdProduct) < 0) {
                alert('Não temos essa quantidade em estoque')
            } else {
                let idx = qtdStock.map(item => item.sku).indexOf(id)
                if (idx > -1) {
                    let qtd = qtdStock[idx].qtd
                    let novaQtd = qtd + qtdProduct
                    let newOldQtd = (oldQtdd - novaQtd)
                    let sku = qtdStock[idx].sku
                    let newArr = [...qtdStock]
                    if (newOldQtd < 0) {
                        alert('Não temos essa quantidade em estoque 2')
                    } else {
                        newArr.splice(idx, 1)
                        newArr = [...newArr, { sku, qtd: novaQtd, id: idProd, newOld: newOldQtd }]
                        setQtdStock([...newArr])
                        auxAddProduct()
                    }
                } else {
                    setQtdStock([...qtdStock, { sku: skuProduct, qtd: qtdProduct, id: idProd, newOld: (oldQtdd - qtdProduct) }])
                    auxAddProduct()
                }

            }
        } else {
            alert('Informe o Código do Produto')
            defaultInput()
        }
        defaultInput()
    }

    const delProduct = (idx: number) => {

        let skuDel = list[idx].sku
        let qtdDel = list[idx].qtdProduct
        let newArrQtdStock = [...qtdStock]
        let index = newArrQtdStock.map(item => item.sku).indexOf(skuDel)
        let newQtd = newArrQtdStock[index].qtd - Number(qtdDel)
        newArrQtdStock[index].qtd = newQtd
        newArrQtdStock[index].newOld = newArrQtdStock[index].newOld + Number(qtdDel)
        let newArr = [...list]
        let newArrIDProducts = [...idProducts]
        let newArrVetId = [...vetIdList]
        newArr.splice(idx, 1)
        setList(newArr)
        newArrIDProducts.splice(idx, 1)
        setIdProducts(newArrIDProducts)
        newArrVetId.splice(idx, 1)
        setVetIdList(newArrVetId)
    }


    useEffect(() => {
        setIdProducts([...list.map(item => item.id)])
    }, [])

    return (
        <div className="itensTabMedical">
            <div className="itensAdd">
                {
                    statusMr !== 1 &&
                    <>
                        <input
                            type="text"
                            className='ipt-skuProduct'
                            onChange={(e) => setSkuProduct(e.target.value)}
                            onBlur={() => getProduct(skuProduct)}
                            value={skuProduct}
                            placeholder={'Código...'}
                        />
                        <input
                            type="text"
                            className='ipt-descProduct'
                            placeholder='Descrição'
                            value={descProduct}
                            disabled
                        />
                        <input
                            type="text"
                            className='ipt-qtdProduct'
                            onChange={(e) => setQtdProduct(parseInt(e.target.value))}
                            value={qtdProduct}
                            placeholder={'Qtd'}
                        />
                        <select
                            name="ipt-vetProduct"
                            id="ipt-vetProduct"
                            value={vetProduct}
                            onChange={(e) => { setVetProduct(e.target.value) }}
                            style={{ width: '307px' }}
                        >
                            <option disabled>Selecione...</option>
                            {
                                vetList.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <option
                                            value={item.name}
                                        >
                                            {item.name}
                                        </option>
                                    </React.Fragment>
                                ))
                            }
                        </select>
                        <input
                            type="text"
                            className='ipt-userProduct'
                            placeholder='Usuário'
                            defaultValue={userProduct}
                            disabled
                        />
                        <input
                            type="text"
                            className='ipt-dateProduct'
                            defaultValue={moment().format('YYYY-MM-DD')}
                            disabled
                            hidden
                        />
                        <button
                            className='btn-insertProduct'
                            onClick={() => addProduct(skuProduct)}
                        >
                            Inserir
                        </button>
                    </>
                }
            </div>
            <table className='itensListMedical'>
                <thead className='divThead'>
                    <tr className='trHeadItens'>
                        <th style={{ flex: '0.8' }}>SKU</th>
                        <th style={{ flex: '1.4' }}>Descrição</th>
                        <th style={{ flex: '0.5' }}>Qtd.</th>
                        <th style={{ flex: '1.5' }}>Veterinário</th>
                        <th style={{ flex: '0.8' }}>Usuário</th>
                        <th style={{ flex: '1' }}>Data</th>
                    </tr>
                </thead>
                <tbody className='divScroll' style={{ overflowY: 'scroll', height: '213px' }}>
                    {list.length > 0 &&
                        list.map((item: any, index) => (
                           <tr className='tableRow' key={index}>
                                <td>
                                    <input
                                        className='tbSku-product'
                                        type="text"
                                        value={item.sku?.toUpperCase()}
                                        disabled
                                    />
                                </td>
                                <td>
                                    <input
                                        className='tbDescription-product'
                                        type="text"
                                        value={item.description?.toUpperCase()}
                                        disabled
                                    />
                                </td>
                                <td>
                                    <input
                                        className='tbQtd-product'
                                        type="number"
                                        value={item?.itensMedicalRecordsModel.qtd?.toString()}
                                        disabled
                                    />
                                </td>
                                <td>
                                    <input
                                        className='tbVet-product'
                                        type="text"
                                        value={item?.itensMedicalRecordsModel.name_vet?.toUpperCase()}
                                        disabled
                                    />
                                </td>
                                <td>
                                    <input
                                        className='tbUser-product'
                                        type="text"
                                        value={item?.itensMedicalRecordsModel.user?.toUpperCase()}
                                        disabled
                                    />
                                </td>
                                <td>
                                    <input
                                        className='tbDate-product'
                                        type="text"
                                        value={moment(item?.itensMedicalRecordsModel.date).format('DD-MM-YYYY')}
                                        disabled
                                    />
                                </td>
                                {
                                    statusMr !== 1 &&
                                    <td>
                                        <input
                                            className='btnDel-item'
                                            type="button"
                                            value="X"
                                            onClick={() => delProduct(index)}
                                        />
                                    </td>
                                }
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}