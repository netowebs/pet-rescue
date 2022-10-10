//import PrintIcon from '@mui/icons-material/Print';
import { MenuItem } from '@mui/material';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './lctonew.scss'
import swal from 'sweetalert'
import { stock } from '../../../api/apiStock';
import { useCategoryProduct } from '../../hooks/useCategoryProduct';
import { useBrandProduct } from '../../hooks/useBrandProduct';
import { ModalCategoryProduct } from '../../buttons/modalCategoryProduct/ModalCategoryProduct';
import { DatatableCategoryProduct } from '../../datatableCategoryProduct/DatatableCategoryProduct';
import { ModalBrandProduct } from '../../buttons/modalBrandProduct/ModalBrandProduct';
import { DatatableBrandProduct } from '../../datatableBrandProduct/DatatableBrandProduct';
import { Stock } from '../../../types/typeStock';
import { PaginatedList } from 'react-paginated-list';
import { lcto } from '../../../api/apiLcto';

export const LctoNew = () => {

    const params = useParams()

    //UseState Inputs
    const [idCad, setIdCad] = useState(String)
    const [dtCad, setDtCad] = useState(String)
    const [user, setUser] = useState(String)
    const [qtdItens, setQtdItens] = useState(50)
    const [valNf, setValNf] = useState(Number)

    const [listProducts, setListProducts] = useState<Stock>()
    const [productsLctos, setProductsLcto] = useState<Stock[]>([])

    const getProduct = async (sku: string) => {
        let json = await stock.getProduct(sku)
        setListProducts(json)
    }


    const { categories } = useCategoryProduct()
    const { brands } = useBrandProduct()

    useEffect(() => {
        setDtCad(moment().format('DD/MM/YYYY'))
    }, [dtCad])

    //Function Create
    const handleCreate = async () => {
        const data: any = { user, qtdItens, valNf }

        if (user == '' || qtdItens == null || valNf == null) {
            alert('Existem campos vazios')
        } else {
            const res = await stock.createProduct(data)
            if (res.success) {
                swal(res.message, " ", "success")
                    .then(() => {
                        window.location.href = '/stock'
                    })
            } else {
                swal("Error !", "" + JSON.stringify(res.message), "error")
            }
        }
    }

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
                            <Link to={'/stock'}>
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
                            <div className="boxDescription">
                                <label htmlFor="ipt-description">Descrição</label><br />
                                <input
                                    className='ipt-description'
                                    type="text"
                                    name='description'
                                // onChange={
                                //     (e) => setDescription(e.target.value)
                                // }
                                />
                            </div>
                            <div className="boxSku">
                                <label htmlFor="ipt-sku">Código</label><br />
                                <input className='ipt-sku' type="text"
                                    name='sku'
                                // onChange={
                                //     (e) => setSku(e.target.value)
                                // }

                                />
                            </div>
                            <div className="boxValidity">
                                <label htmlFor="ipt-validity">Validade</label><br />
                                <input
                                    className='ipt-validity'
                                    type="text"
                                // onChange={
                                //     (e) => setValidity(moment(e.target.value).format('YYYY-MM-DD'))
                                // }
                                />
                            </div>
                            <div className="boxQtd">
                                <label htmlFor="ipt-qtd">Quantidade</label><br />
                                <input
                                    className='ipt-qtd'
                                    type="text"
                                // onChange={
                                //     (e) => setQtd(e.target.value)
                                // }
                                />
                            </div>
                            <div className="boxUnit">
                                <label htmlFor="ipt-unit">Unidade</label><br />
                                <select
                                    className='ipt-unit'
                                    name="unit"
                                    id="unit"
                                // onChange={(e) => setUnit(e.target.value)}
                                >
                                    <option value="KG">Kg</option>
                                    <option value="MT">Mt</option>
                                    <option value="Un">Un</option>
                                </select>
                            </div>
                            <div className="boxLocation">
                                <label htmlFor="ipt-location">Localização</label><br />
                                <input
                                    className='ipt-location'
                                    type="text"
                                // onChange={
                                //     (e) => setLocation(e.target.value)
                                // }
                                />
                            </div>
                            <div className="boxCost">
                                <label htmlFor="ipt-cost">Custo</label><br />
                                <input
                                    className='ipt-cost'
                                    type="number"
                                // onChange={
                                //     (e) => setCost(e.target.value)
                                // }
                                />
                            </div>
                            <div className="boxCategory">
                                <label htmlFor="ipt-category">Categoria</label><br />
                                <select
                                    className='ipt-category'
                                    name="category"
                                    id="category"
                                    defaultValue={'SELECIONE...'}
                                // onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option disabled>SELECIONE...</option>
                                    {
                                        categories.map((item, index) => (
                                            <option
                                                value={item.id}
                                                key={index}
                                            >

                                                {item.description}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="boxNewCategory">
                                <ModalCategoryProduct
                                    Comp={<DatatableCategoryProduct />}
                                />
                            </div>
                            <div className="boxBrand">
                                <label htmlFor="ipt-brand">Marca</label><br />
                                <select
                                    defaultValue={'SELECIONE...'}
                                    className='ipt-brand'
                                    name="brand"
                                    id="brand"
                                // onChange={(e) => setBrand(e.target.value)}
                                >
                                    <option disabled>SELECIONE...</option>
                                    {
                                        brands.map((item, index) => (
                                            <option
                                                value={item.id}
                                                key={index}
                                            >
                                                {item.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="boxNewBrand">
                                <ModalBrandProduct
                                    Comp={<DatatableBrandProduct />}
                                />
                            </div>
                            <fieldset className='fieldset--category-brand'>
                                <legend>Itens do Estoque</legend>
                                <div className="boxObs">
                                    <div
                                        className='container--productsLcto'
                                    >
                                        {
                                            <div
                                                className='containner--productsLcto'
                                            >
                                                <section>
                                                    {Array.from({ length: qtdItens }, (_, i) =>
                                                        <>
                                                            <div
                                                                className='sku'
                                                            >
                                                                <input type="text" placeholder='SKU' />
                                                                <input type="text" placeholder='Descrição' />
                                                                <input type="text" placeholder='Quantidade' />
                                                                <input type="text" placeholder='Validade' />
                                                            </div>
                                                        </>)}
                                                </section>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}