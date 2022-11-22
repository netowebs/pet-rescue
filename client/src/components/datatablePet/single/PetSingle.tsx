import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apartment, pet, sections as sectApi } from '../../../api/api';
import './petsingle.scss'
import swal from 'sweetalert'
import { ModalSectionApartment } from '../../buttons/modalSectionApartment/ModalSectionApartment';
import { DatatableApartment } from '../../datatableApartment/DatatableApartment';
import { stock } from '../../../api/apiStock';
import { Apartment } from '../../../types/typeApartment';
import { Section } from '../../../types/typeSection';


export const PetSingle = () => {

    const params = useParams()

    //UseState Iputs
    const [idCad, setIdCad] = useState(String)
    const [name, setName] = useState(String)
    const [dtRescue, setDtRescue] = useState(String)
    const [dtCad, setDtCad] = useState(String)
    const [species, setSpecies] = useState(String)
    const [size, setSize] = useState(String)
    const [age, setAge] = useState(String)
    const [sex, setSex] = useState(String)
    const [temperament, setTemperament] = useState(String)
    const [adptionStatus, setAdoptionStatus] = useState(String)
    const [food, setFood] = useState(String)
    const [color, setColor] = useState(String)
    const [coat, setCoat] = useState(String)
    const [note, setNote] = useState(String)
    const [user, setUser] = useState(String)
    const [adptionId, setAdoptionId] = useState(Number)
    const [adoptionDate, setAdoptionDate] = useState(String)
    const [obitoDate, setObitoDate] = useState(String)

    //UseState Food
    const [idFood, setIdFood] = useState(Number)
    const [skuFood, setSkuFood] = useState(String)
    const [descriptionFood, setDescriptionFood] = useState(String)

    //UseState Section and Apartment
    const [sections, setSections] = useState<Section[]>([])
    const [apartments, setApartments] = useState<Apartment[]>([])
    const [idApartment, setIdApartment] = useState(Number)
    const [idSection, setIdSection] = useState(String)

    useEffect(() => {
        const getAptos = async (idSection: string) => {
            let json = await apartment.getApartmentBySection(idSection)
            if (json) {
                setApartments(json)
            }
        }

        const getSections = async () => {
            let json = await sectApi.getAllSections()
            if (json) {
                setSections(json)
            }
        }

        getAptos(idSection)
        getSections()
    }, [idSection])


    const getFoodSku = async (skuFood: string) => {
        const json = await stock.getProductSku(skuFood)
        if (json) {
            setIdFood(json.data.id)
            setDescriptionFood(json.data.description)
        }
    }

    const getFoodId = async (idFood: number) => {
        const json = await stock.getProduct(idFood.toString())
        if (json) {
            setSkuFood(json.data.sku)
            setIdFood(json.data.id)
            setDescriptionFood(json.data.description)
        }
    }

    useEffect(() => {
        if (params.Id) {
            const loadPetDetail = async (id: string) => {
                let res = await pet.getPet(id)
                if (res.success) {
                    console.log(res.data)
                    setIdCad(("000000" + res.data.id).slice(-6))
                    setDtRescue(res.data.date_rescue)
                    setDtCad(moment(res.data.date_cad).format('DD/MM/YYYY'))
                    setName(res.data.name)
                    setSpecies(res.data.species)
                    setAge(res.data.age_approx)
                    setSex(res.data.sex)
                    setTemperament(res.data.temperament)
                    setSize(res.data.size)
                    setAdoptionStatus(res.data.status)
                    setFood(res.data.qtd_food)
                    setColor(res.data.color)
                    setCoat(res.data.coat)
                    setNote(res.data.note)
                    getFoodId(res.data.id_stock)
                    setIdSection(res.data.ApartmentModel.section_id)
                    setIdApartment(res.data.apartment_id)
                    setUser(res.data.user)
                    setAdoptionId(res.data.adoption_id)
                    setAdoptionDate(res.data.adoption_date)
                    setObitoDate(res.data.obito_date)
                } else {
                    swal("Ops ", "" + 'Cadastro Não Encontrado', "error")
                        .then(() => {
                            window.location.href = '/pets'
                        })
                }
            }
            loadPetDetail(params.Id)
        }
    }, [])

    //Function Create
    const handleUpdate = async () => {
        const data: any = { idCad, dtRescue, name, species, age, sex, temperament, adptionStatus, food, color, coat, note, size, idApartment, idFood }

        if (name.trim() !== '' && species.trim() !== '' && size.trim() !== '' && age.trim() !== '' && temperament.trim() !== '' && adptionStatus.trim() !== '' && food !== '' && color.trim() !== '' && coat !== '' && sex !== '' && idApartment !== null && idFood !== null) {
            const res = await pet.updatePet(data)
            if (res.success) {
                swal(res.message, " ", "success")
                    .then(() => {
                        window.location.href = '/pets'
                    })
            } else {
                swal("Error !", "" + JSON.stringify(res.message), "error")
            }
        } else {
            alert('Existem campos vazios')
        }
    }


    const handleDelete = async () => {
        if (idCad) {
            const res = await pet.deletePet(idCad)
            if (res.success) {
                swal(res.message, " ", "success")
                    .then(() => {
                        window.location.href = '/pets'
                    })
            } else {
                swal("Error !", "" + JSON.stringify(res.message), "error")
            }
        }
    }

    return (
        <div className='container--pet-single'>
            <div className='formDetail'>
                <div className="topBar">
                    <div className="topBar-interno">
                        <div className="topBar-inputs">
                            <div className="boxId">
                                <label htmlFor="ipt-id">Código</label><br />
                                <input
                                    className='ipt-id'
                                    type="text"
                                    defaultValue={idCad}
                                    disabled
                                />
                            </div>
                            <div className="boxDtCad">
                                <label htmlFor="ipt-dtRescue">Data Cadastro</label><br />
                                <input
                                    className='ipt-dtRescue'
                                    type="text"
                                    defaultValue={dtCad}
                                    disabled
                                />
                            </div>
                            <div className="boxDtRescue">
                                <label htmlFor="ipt-dtRescue">Data Resgate</label><br />
                                <input
                                    className='ipt-dtRescue'
                                    type="date"
                                    defaultValue={dtRescue}
                                    max={moment().format('YYYY-MM-DD')}
                                />
                            </div>
                            <div className="boxUser">
                                <label htmlFor="ipt-user">Cadastro Efetuado Por:</label><br />
                                <input
                                    className='ipt-user'
                                    type="text"
                                    defaultValue={user}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="topBar-Btn">
                            <input type="submit" value="Salvar" className='btnSalvar' onClick={() => handleUpdate()} />
                            <Link to={'/pets'}>
                                <input type="button" value="Cancelar" className='btnCancelar' />
                            </Link>
                            <input type="button" value="Excluir" className='btnExcluir' onClick={() => handleDelete()} />
                        </div>
                    </div>
                </div>
                <fieldset>
                    <legend>
                        Preencha com o máximo de informações possíveis
                    </legend>
                    <div className="middleBar">
                        <div className="middleBar-interno">
                            <div className="boxName">
                                <label htmlFor="ipt-name">Nome</label><br />
                                <input
                                    className='ipt-name'
                                    type="text"
                                    name='nome'
                                    defaultValue={name}
                                    onChange={
                                        (e) => setName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="boxSpecies">
                                <label htmlFor="ipt-species">Espécie</label><br />
                                <input className='ipt-species' type="text"
                                    name='species'
                                    defaultValue={species}
                                    onChange={
                                        (e) => setSpecies(e.target.value)
                                    }

                                />
                            </div>
                            <div className="boxSize">
                                <label htmlFor="ipt-size">Porte</label><br />
                                <select
                                    className='ipt-size'
                                    name="size"
                                    id="size"
                                    value={size}
                                    onChange={
                                        (e) => setSize(e.target.value)
                                    }
                                >
                                    <option value="PEQUENO">PEQUENO</option>
                                    <option value="MEDIO">MÉDIO</option>
                                    <option value="GRANDE">GRANDE</option>
                                    <option value="GIGANTE">GIGANTE</option>
                                </select>
                            </div>
                            <div className="boxAge">
                                <label htmlFor="ipt-age">Idade Aprox.</label><br />
                                <input
                                    className='ipt-age'
                                    type="text"
                                    defaultValue={age}
                                    onChange={
                                        (e) => setAge(e.target.value)
                                    }
                                />
                            </div>
                            <div className="boxTemperament">
                                <label htmlFor="ipt-temperament">Temperamento</label><br />
                                <input
                                    className='ipt-temperament'
                                    type="text"
                                    defaultValue={temperament}
                                    onChange={
                                        (e) => setTemperament(e.target.value)
                                    }
                                />
                            </div>
                            <div className="boxStatuAdoptions">
                                <label htmlFor="ipt-status">Adoção</label><br />
                                <select
                                    className='ipt-status'
                                    name="status"
                                    id="status"
                                    value={adptionStatus}
                                    onChange={
                                        (e) => setAdoptionStatus(e.target.value)
                                    }
                                >
                                    <option value="INDISPONIVEL">INDISPONÍVEL</option>
                                    <option value="DISPONIVEL">DISPONÍVEL</option>
                                </select>
                            </div>
                            <div className="boxFood">
                                <label htmlFor="ipt-food">Qtd Ração/Dia g</label><br />
                                <input
                                    className='ipt-food'
                                    type="text"
                                    defaultValue={food}
                                    onChange={
                                        (e) => setFood(e.target.value)
                                    }
                                />
                            </div>
                            <div className="boxColor">
                                <label htmlFor="ipt-color">Coloração</label><br />
                                <input
                                    className='ipt-color'
                                    type="text"
                                    defaultValue={color}
                                    onChange={
                                        (e) => setColor(e.target.value)
                                    }
                                />
                            </div>
                            <div className="boxCoat">
                                <label htmlFor="ipt-coat">Pelagem</label><br />
                                <select
                                    className='ipt-coat'
                                    name="coat"
                                    id="coat"
                                    value={coat}
                                    onChange={
                                        (e) => setCoat(e.target.value)
                                    }
                                >
                                    <option value="CURTO">CURTO</option>
                                    <option value="MEDIO">MÉDIO</option>
                                    <option value="LONGO">LONGO</option>
                                </select>
                            </div>
                            <div className="boxSex">
                                <label htmlFor="ipt-sex">Sexo</label><br />
                                <select
                                    className='ipt-sex'
                                    name="sex"
                                    id="sex"
                                    value={sex}
                                    onChange={
                                        (e) => setSex(e.target.value)
                                    }
                                >
                                    <option value="MACHO">MACHO</option>
                                    <option value="FEMEA">FEMEA</option>
                                </select>
                            </div>
                            {
                                adptionId !== null ? (
                                    <div className="boxDtAdoption">
                                        <label htmlFor="ipt-dtAdoption">Data Adoção</label><br />
                                        <input
                                            className='ipt-dtAdoption'
                                            type="date"
                                            defaultValue={adoptionDate}
                                            disabled
                                        />
                                    </div>
                                )
                                    :
                                    null
                            }
                            {
                                obitoDate !== null ? (
                                    <div className="boxDtAdoption">
                                        <label htmlFor="ipt-dtAdoption">Data Óbito</label><br />
                                        <input
                                            className='ipt-dtAdoption'
                                            type="date"
                                            defaultValue={obitoDate}
                                            disabled
                                        />
                                    </div>
                                )
                                    :
                                    null
                            }
                            <div className="boxInfo">
                                <label htmlFor="ipt-info">Observações</label><br />
                                <textarea className='ipt-info'
                                    name="ipt-info" id="ipt-info"
                                    defaultValue={note}
                                    onChange={
                                        (e) => setNote(e.target.value)}
                                >
                                </textarea>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div className="fieldsets">
                    <fieldset className='field-botton'>
                        <legend>Hospedagem</legend>
                        <div className="bottonBar">
                            <div className="bottonBar-interno">
                                <div className="boxSection">
                                    <label htmlFor="ipt-section">Seção</label><br />
                                    <select
                                        name=""
                                        id=""
                                        onChange={(e) => setIdSection(e.target.value)}
                                        value={idSection}
                                    >
                                        {
                                            sections.map((item, index) => (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="boxApartment">
                                    <label htmlFor="ipt-apartment">Apartment</label><br />
                                    <select
                                        name=""
                                        id=""
                                        value={idApartment}
                                        onChange={(e) => setIdApartment(parseInt(e.target.value))}
                                    >
                                        <option value={''}>Selecione...</option>
                                        {
                                            apartments.map((item, index) => (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="modalBox">
                                <ModalSectionApartment
                                    Comp={<DatatableApartment />}
                                />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className='field-food'>
                        <legend>Consumo Ração</legend>
                        <div className="bottonBar">
                            <div className="bottonBar-interno">
                                <div className="boxIdFood">
                                    <label htmlFor="ipt-idFood">SKU</label><br />
                                    <input
                                        type="text"
                                        className='ipt-idFood'
                                        onChange={(e) => setSkuFood(e.target.value)}
                                        onBlur={() => getFoodSku(skuFood)}
                                        defaultValue={skuFood}
                                    />
                                </div>
                                <div className="boxDescriptionFood">
                                    <label htmlFor="ipt-descriptionFood">Descrição</label><br />
                                    <input
                                        type="text"
                                        className='ipt-descriptionFood'
                                        disabled
                                        defaultValue={descriptionFood}
                                    />
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    )
}