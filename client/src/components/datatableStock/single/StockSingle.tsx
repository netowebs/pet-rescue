//import PrintIcon from '@mui/icons-material/Print';
import { MenuItem } from '@mui/material';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './stocksingle.scss'
import swal from 'sweetalert'
import { viaCep } from '../../../api/apiViaCep';
import { tutor } from '../../../api/apiTutors';
import { useCategoryProduct } from '../../hooks/useCategoryProduct';
import { useBrandProduct } from '../../hooks/useBrandProduct';
import { stock } from '../../../api/apiStock';
import { ModalCategoryProduct } from '../../buttons/modalCategoryProduct/ModalCategoryProduct';
import { DatatableCategoryProduct } from '../../datatableCategoryProduct/DatatableCategoryProduct';
import { ModalBrandProduct } from '../../buttons/modalBrandProduct/ModalBrandProduct';
import { DatatableBrandProduct } from '../../datatableBrandProduct/DatatableBrandProduct';

export const StockSingle = () => {

    const params = useParams()

    const [idCad, setIdCad] = useState(String)
    const [dtCad, setDtCad] = useState(String)
    const [sku, setSku] = useState(String)
    const [description, setDescription] = useState(String)
    const [validity, setValidity] = useState(String)
    const [qtd, setQtd] = useState(String)
    const [brand, setBrand] = useState(String)
    const [category, setCategory] = useState(String)
    const [obs, setObs] = useState(String)
    const [location, setLocation] = useState(String)
    const [cost, setCost] = useState(String)
    const [unit, setUnit] = useState(String)

    const { categories } = useCategoryProduct()
    const { brands } = useBrandProduct()

    useEffect(() => {
        if (params.Id) {
            const loadTutor = async (id: string) => {
                let res = await stock.getProduct(id)
                if (res.success) {
                    setIdCad(("000000" + res.data.id).slice(-6))
                    setDtCad(moment(res.data.dtCad).format('DD/MM/YYYY'))
                    setSku(res.data.sku)
                    setDescription(res.data.description)
                    setValidity(res.data.validity)
                    setQtd(res.data.qtd)
                    setBrand(res.data.brand)
                    setCategory(res.data.category)
                    setObs(res.data.obs)
                    setLocation(res.data.location)
                    setCost(res.data.cost)
                    setUnit(res.data.unit)
                } else {
                    swal("Ops ", "" + 'Cadastro Não Encontrado', "error")
                        .then(() => {
                            window.location.href = '/stock'
                        })
                }
            }
            loadTutor(params.Id)
            
        }
    }, [])

    const handleUpdate = async () => {

        const data: any = { idCad, sku, description, validity, qtd, brand, category, obs, location, cost, unit }

        const res = await stock.updateProduct(data)
        if (res.success) {
            swal(res.message, " ", "success",)
                .then(() => {
                    window.location.href = '/stock'
                })
        } else {
            swal("Error !", "" + JSON.stringify(res.message), "error")
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
                                    defaultValue={idCad}
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
                            <input type="submit" value="Salvar" className='btnSalvar' onClick={() => handleUpdate()} />
                            <Link to={'/stock'}>
                                <input type="button" value="Cancelar" className='btnCancelar'/>
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
                                    defaultValue={description}
                                    onChange={
                                        (e) => setDescription(e.target.value)
                                    }
                                />
                            </div>
                            <div className="boxSku">
                                <label htmlFor="ipt-sku">Código</label><br />
                                <input className='ipt-sku' type="text"
                                    name='sku'
                                    defaultValue={sku}
                                    onChange={
                                        (e) => setSku(e.target.value)
                                    }

                                />
                            </div>
                            <div className="boxValidity">
                                <label htmlFor="ipt-validity">Validade</label><br />
                                <input
                                    className='ipt-validity'
                                    type="date"
                                    defaultValue={validity}
                                    min={moment().format('YYYY-MM-DD')}
                                    onChange={
                                        (e) => setValidity(e.target.value)
                                    }
                                />
                            </div>
                            <div className="boxQtd">
                                <label htmlFor="ipt-qtd">Quantidade</label><br />
                                <input
                                    className='ipt-qtd'
                                    type="text"
                                    defaultValue={qtd}
                                    onChange={
                                        (e) => setQtd(e.target.value)
                                    }
                                />
                            </div>
                            <div className="boxUnit">
                                <label htmlFor="ipt-unit">Unidade</label><br />
                                <select
                                    className='ipt-unit'
                                    name="unit" 
                                    id="unit"
                                    defaultValue={unit}
                                    onChange={(e) => setUnit(e.target.value)}
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
                                    defaultValue={location}
                                    onChange={
                                        (e) => setLocation(e.target.value)
                                    }
                                />
                            </div>
                            <div className="boxCost">
                                <label htmlFor="ipt-cost">Custo</label><br />
                                <input
                                    className='ipt-cost'
                                    type="number"
                                    defaultValue={cost}
                                    onChange={
                                        (e) => setCost(e.target.value)
                                    }
                                />
                            </div>
                            <div className="boxCategory">
                                <label htmlFor="ipt-category">Categoria</label><br />
                                <select
                                    className='ipt-category'
                                    name="category"
                                    id="category"
                                    defaultValue={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
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
                                    defaultValue={brand}
                                    className='ipt-brand'
                                    name="brand"
                                    id="brand"
                                    onChange={(e) => setBrand(e.target.value)}
                                >
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
                                <legend>Observações</legend>
                                <div className="boxObs">
                                    <textarea
                                        name="ipt-obs"
                                        id="obs"
                                        defaultValue={obs}
                                        onChange={(e) => setObs(e.target.value)}
                                    >
                                    </textarea>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}