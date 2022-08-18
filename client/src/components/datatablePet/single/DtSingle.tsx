import PrintIcon from '@mui/icons-material/Print';
import { MenuItem, Select } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pet } from '../../../api/api';
import './dtsingle.scss'

export const DtSingle = () => {

    const params = useParams()

    const [idCad, setIdCad] = useState(String)
    const [name, setName] = useState(String);
    const [dtRescue, setDtRescue] = useState(String);
    const [species, setSpecies] = useState(String);
    const [size, setSize] = useState(String)
    const [age, setAge] = useState(String)
    const [temperament, setTemperament] = useState(String)
    const [status, setStatus] = useState(String)
    const [food, setFood] = useState(String)
    const [obs, setObs] = useState(String)
    const [color, setColor] = useState(String)

    const loadPetDetail = async (id: string) => {
        const res = await pet.getPet(id);
        if (res.success && res.data) {
            const data = res.data
            setIdCad(String("000000" + data.id).slice(-6))
            setDtRescue(moment(data.date_rescue).format("DD/MM/YYYY"))
            setName(data.name)
            setSpecies(data.species)
            setAge(data.age_approx)
            setSize(data.size)
            setTemperament(data.temperament)
            setStatus(data.status)
            setFood(data.food)
            setObs(data.note)
            setColor(data.color)
        }
    }

    useEffect(() => {
        if (params.Id) {
            loadPetDetail(params.Id)
        }
    }, [])

    return (
        <div className='container-single'>
            <form action="" method="post" className='formDetail'>
                <div className="topBar">
                    <div className="topBar-interno">
                        <div className="topBar-inputs">
                            <div className="boxId">
                                <label htmlFor="ipt-id">Código</label><br />
                                <input className='ipt-id' type="text" defaultValue={idCad} disabled />
                            </div>
                            <div className="boxDtCad">
                                <label htmlFor="ipt-dtRescue">Data Cadastro</label><br />
                                <input className='ipt-dtRescue' type="text" defaultValue={(dtRescue)} disabled />
                            </div>
                            <div className="boxDtRescue">
                                <label htmlFor="ipt-dtRescue">Data Resgate</label><br />
                                <input className='ipt-dtRescue' type="text" defaultValue={(dtRescue)} />
                            </div>
                        </div>
                        <div className="topBar-Btn">
                            <input type="button" value="Salvar" className='btnSalvar' />
                            <input type="button" value="Cancelar" className='btnCancelar' />
                            <input type="button" value="Excluir" className='btnExcluir' />
                        </div>
                    </div>
                </div>
                <div className="middleBar">
                    <div className="middleBar-interno">
                        <div className="boxName">
                            <label htmlFor="ipt-name">Nome</label><br />
                            <input className='ipt-name' type="text"
                                name='nome'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="boxSpecies">
                            <label htmlFor="ipt-species">Espécie</label><br />
                            <input className='ipt-species' type="text"
                                name='species'
                                value={species}
                                onChange={(e) => setSpecies(e.target.value)}
                                
                            />
                        </div>
                        <div className="boxSize">
                            <label htmlFor="ipt-size">Porte</label><br />
                            <Select
                                className='ipt-size'
                                name='size'
                                value={size}
                                onChange={(e)=>setSize(e.target.value)}
                            >
                                <MenuItem className='ipt-menu' value={'PEQUENO'}>PEQUENO</MenuItem>
                                <MenuItem className='ipt-menu' value={'MEDIO'}>MÉDIO</MenuItem>
                                <MenuItem className='ipt-menu' value={'GRANDE'}>GRANDE</MenuItem>
                            </Select>
                        </div>
                        <div className="boxAge">
                            <label htmlFor="ipt-age">Idade Aprox.</label><br />
                            <input className='ipt-age' type="text" 
                                value={age} 
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div className="boxTemperament">
                            <label htmlFor="ipt-temperament">Temperamento</label><br />
                            <input className='ipt-temperament' type="text" 
                            value={temperament}/>
                        </div>
                        <div className="boxStatuAdoptions">
                            <label htmlFor="ipt-status">Adoção</label><br />
                            <Select 
                                className='ipt-status'
                                name='status'
                                value={status} 
                                onChange={(e)=> setStatus(e.target.value)}
                            >
                                <MenuItem value={'INDISPONIVEL'}>INDISPONÍVEL</MenuItem>
                                <MenuItem value={'DISPONIVEL'}>DISPONÍVEL</MenuItem>
                            </Select>
                        </div>
                        <div className="boxFood">
                            <label htmlFor="ipt-food">Qtd Ração/Dia g</label><br />
                            <input className='ipt-food' type="text" value={food}/>
                        </div>
                        <div className="boxColor">
                            <label htmlFor="ipt-color">Coloração</label><br />
                            <input className='ipt-color' type="text" value={color}/>
                        </div>
                        <div className="boxInfo">
                            <label htmlFor="ipt-info">Observações</label><br />
                            <textarea className='ipt-info'
                                name="ipt-info" id="ipt-info" 
                                value={obs}
                                onChange={(e)=> setObs(e.target.value)}
                                >
                                </textarea>
                        </div>
                    </div>
                </div>
                <div className="bottonBar">
                    ...
                </div>
            </form>
        </div>
    )
}