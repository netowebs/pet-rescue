//import PrintIcon from '@mui/icons-material/Print';
import { MenuItem } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apartment, pet, sections as secctt } from '../../../api/api';
import { useApartments } from '../../hooks/useApartment';
import { usePets } from '../../hooks/usePets';
import { useSection } from '../../hooks/useSection';
import { Apartment } from '../typeApartment';
import { Pet } from '../typePet';
import { Section } from '../typeSection';
import './petsingle.scss'

let initValue: Pet

type AptModel = {
    id:number,
    name: string
}

let inititi: AptModel

export const PetSingle = () => {

    const params = useParams()
    const [details, setDetails] = useState<Pet>(initValue)
    const [aptModel, setAptModel] = useState<AptModel>(inititi)
    const [sectModel, setSectModel] = useState<AptModel>(inititi)
    const { sections } = useSection()
    const [selectedSection, setSelectedSection] = useState(String(sectModel?.id))
    const [selectedApartment, setSelectedApartment] = useState(String(aptModel?.name))
    const { apts } = useApartments({ sectId: selectedSection })

    useEffect(() => {
        if (params.Id) {
            const loadPetDetail = async (id: string) => {
                let json = await pet.getPet(id)
                let json2 = await apartment.getApartment(json.apartment_id)
                let json3 = await secctt.getSection(json2.section_id)
                setDetails(json)
                setAptModel(json2)
                setSelectedSection(json3.id)
                setSelectedApartment(json2.name)
            }
            loadPetDetail(params.Id)
        }
        console.log(selectedSection)
        console.log(selectedApartment)
    }, [])

    const handleSectionUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSection(e.target.value)
    }

    const handleApartmentUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedApartment(e.target.value)
    }

    return (
        <div className='container-single'>
            <form action="" method="post" className='formDetail'>
                <div className="topBar">
                    <div className="topBar-interno">
                        <div className="topBar-inputs">
                            <div className="boxId">
                                <label htmlFor="ipt-id">Código</label><br />
                                <input
                                    className='ipt-id'
                                    type="text"
                                    defaultValue={details?.id}
                                    disabled
                                />
                            </div>
                            <div className="boxDtCad">
                                <label htmlFor="ipt-dtRescue">Data Cadastro</label><br />
                                <input
                                    className='ipt-dtRescue'
                                    type="text"
                                    defaultValue={details?.date_rescue}
                                    disabled
                                />
                            </div>
                            <div className="boxDtRescue">
                                <label htmlFor="ipt-dtRescue">Data Resgate</label><br />
                                <input
                                    className='ipt-dtRescue'
                                    type="text"
                                    defaultValue={details?.date_rescue}
                                />
                            </div>
                        </div>
                        <div className="topBar-Btn">
                            <input type="button" value="Salvar" className='btnSalvar' />
                            <input type="button" value="Cancelar" className='btnCancelar' />
                            <input type="button" value="Excluir" className='btnExcluir' />
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
                                    defaultValue={details?.name}
                                    onChange={
                                        (e) => setDetails({
                                            ...details,
                                            name: e.target.value
                                        })
                                    }
                                />
                            </div>
                            <div className="boxSpecies">
                                <label htmlFor="ipt-species">Espécie</label><br />
                                <input className='ipt-species' type="text"
                                    name='species'
                                    defaultValue={details?.species}
                                    onChange={
                                        (e) => setDetails({
                                            ...details,
                                            species: e.target.value
                                        })}

                                />
                            </div>
                            <div className="boxSize">
                                <label htmlFor="ipt-size">Porte</label><br />
                                <select
                                    className='ipt-size'
                                    name="size"
                                    id="size"
                                    value={details?.size}
                                    onChange={
                                        (e) => setDetails({
                                            ...details,
                                            size: e.target.value
                                        })
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
                                    defaultValue={details?.age_approx}
                                    onChange={
                                        (e) => setDetails({
                                            ...details,
                                            age_approx: parseInt(e.target.value)
                                        })
                                    }
                                />
                            </div>
                            <div className="boxTemperament">
                                <label htmlFor="ipt-temperament">Temperamento</label><br />
                                <input
                                    className='ipt-temperament'
                                    type="text"
                                    defaultValue={details?.temperament}
                                    onChange={
                                        (e) => setDetails({
                                            ...details,
                                            temperament: e.target.value
                                        })
                                    }
                                />
                            </div>
                            <div className="boxStatuAdoptions">
                                <label htmlFor="ipt-status">Adoção</label><br />
                                <select
                                    className='ipt-status'
                                    name="status"
                                    id="status"
                                    value={details?.adoptionStatus}
                                    onChange={
                                        (e) => setDetails({
                                            ...details,
                                            adoptionStatus: e.target.value
                                        })
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
                                    defaultValue={details?.food}
                                    onChange={
                                        (e) => setDetails(
                                            ({
                                                ...details,
                                                food: parseFloat(e.target.value)
                                            })
                                        )
                                    }
                                />
                            </div>
                            <div className="boxColor">
                                <label htmlFor="ipt-color">Coloração</label><br />
                                <input
                                    className='ipt-color'
                                    type="text"
                                    defaultValue={details?.color}
                                    onChange={
                                        (e) => setDetails({
                                            ...details,
                                            color: e.target.value
                                        })
                                    }
                                />
                            </div>
                            <div className="boxCoat">
                                <label htmlFor="ipt-coat">Pelagem</label><br />
                                <select
                                    className='ipt-coat'
                                    name="coat"
                                    id="coat"
                                    value={details?.coat}
                                    onChange={
                                        (e) => setDetails({
                                            ...details,
                                            coat: e.target.value
                                        })
                                    }
                                >
                                    <option value="CURTO">CURTO</option>
                                    <option value="MEDIO">MÉDIO</option>
                                    <option value="LONGO">LONGO</option>
                                </select>

                            </div>
                            <div className="boxInfo">
                                <label htmlFor="ipt-info">Observações</label><br />
                                <textarea className='ipt-info'
                                    name="ipt-info" id="ipt-info"
                                    defaultValue={details?.note}
                                    onChange={
                                        (e) => setDetails({
                                            ...details,
                                            note: e.target.value
                                        })}
                                >
                                </textarea>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset className='field-botton'>
                    <legend>Hospedagem</legend>
                    <div className="bottonBar">
                        <div className="bottonBar-interno">
                            <div className="boxSection">
                                <label htmlFor="ipt-section">Seção</label><br />
                                <select 
                                    value={selectedSection}
                                    onChange={handleSectionUpdate}
                                >
                                    {sections.map((item, index)=>(
                                        <option
                                            key={index}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="boxTeste">
                                <label htmlFor="ipt-apartment">Apartment</label><br />
                                <select
                                    value={selectedApartment}
                                    onChange={handleApartmentUpdate}
                                >
                                    {apts.map((item, index)=>(
                                        <option 
                                            key={index}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}