import PrintIcon from '@mui/icons-material/Print';
import moment from 'moment';
import { useEffect, useState } from 'react';
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

    const loadPetDetail = async (id: string) => {
        const res = await pet.getPet(id);
        if (res.success && res.data) {
            const data = res.data
            setIdCad(String("000000" + data.id).slice(-6))
            setDtRescue(moment(data.date_rescue).format("DD/MM/YYYY"))
            setName(data.name)
            setSpecies(data.species)
            setSize(data.size)
            console.log(size)
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
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </div>
                            <div className="boxSpecies">
                                <label htmlFor="ipt-species">Espécie</label><br />
                                <input className='ipt-species' type="text"
                                    name='species'
                                    onChange={(e) => setSpecies(e.target.value)}
                                    value={species}
                                />
                            </div>
                            <div className="boxSize">
                                <label htmlFor="ipt-size">Porte</label><br />
                                <select name="ipt-size" id="ipt-size" value={size}>
                                    <option disabled>Selecione</option>
                                    <option value="PEQUENO">Pequeno</option>
                                    <option value="MEDIO">Médio</option>
                                    <option value="GRANDE">Grande</option>
                                </select>
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