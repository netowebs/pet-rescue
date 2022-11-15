import moment from 'moment';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './medicalrecordssingle.scss'
import swal from 'sweetalert'
import { VetTab } from '../tabs/vetTab';
import { ItensTab } from '../tabs/itensTab';
import { pet } from '../../../api/api';
import { vet } from '../../../api/apiVet';
import { medicalRecords } from '../../../api/apiMedicalRecords';
import { ItensList } from '../../../types/typeItensList';
import { VetList } from '../../../types/typeVetList';
import { EventsTab } from '../tabs/eventsTab';
import { EventsList } from '../../../types/typeEventsList';
import { stock } from '../../../api/apiStock';

export type Pivo = {
    qtd: number
    date: string
    vetIdProduct: number
}

export type UpdateStock = {
    id: number
    sku: string
    qtd: number
    newOld: number
}

export const MedicalRecordSingle = () => {

    const params = useParams()

    //Dados do lançamento
    const [dtCad, setDtCad] = useState(String)
    const [status, setStatus] = useState(String)
    const [lastChange, setLastChange] = useState(String)
    const [user, setUser] = useState(String)
    const [obs, setObs] = useState(String)
    const [id, setId] = useState(String)
    const [statusMr, setStatusMr] = useState(Number)
    const [txtBtnBaixar, setTxtBtnBaixar] = useState('')
    const [linkTo, setLinkTo] = useState('')

    //Dados do animal
    const [animalId, setAnimalId] = useState(String)
    const [animalName, setAnimalName] = useState(String)
    const [animalSpecie, setAnimalSpecie] = useState(String)
    const [animalTemperament, setAnimalTemperament] = useState(String)
    const [animalAge, setAnimalAge] = useState(String)
    const [animalSex, setAnimalSex] = useState(String)

    // //Dados do Veterinário Reponsável
    const [vetRespId, setVetRespId] = useState(Number)
    const [vetRespCrmv, setVetRespCrmv] = useState(String)
    const [vetRespName, setVetRespName] = useState(String)
    const [vetRespSpeciality, setVetRespSpeciality] = useState(String)
    const [vetRespPhone, setVetRespPhone] = useState(String)

    //Arrays dos componentes Vet, Itens e Events
    const [vetList, setVetList] = useState<VetList[]>([])
    const [vetIdList, setVetIdList] = useState<number[]>([])
    const [listItens, setlistItens] = useState<ItensList[]>([])
    const [eventsList, setEventsList] = useState<EventsList[]>([])
    const [idVets, setIdVets] = useState<number[]>([])
    const [idProducts, setIdProducts] = useState<number[]>([])

    //UpdateStock
    const [qtdMedical, setQtdMedical] = useState<number[]>([])
    const [stockQtd, setStockQtd] = useState<UpdateStock[]>([])

    //Tab Controll
    const [activeTab, setActiveTab] = useState('obsTab')

    const handleTab = (flag: number) => {
        switch (flag) {
            case 0:
                setActiveTab('obsTab')
                break
            case 1:
                setActiveTab('vetTab')
                break
            case 2:
                setActiveTab('itensTab')
                break
            case 3:
                setActiveTab('eventsTab')
                break
            default:
                alert('Guia não encontrada')
        }
    }

    //Get Animal
    const getAnimal = async (id: string) => {
        let json = await pet.getPet(id)
        setAnimalId(json.data.id)
        setAnimalName(json.data.name)
        setAnimalSpecie(json.data.species)
        setAnimalTemperament(json.data.temperament)
        setAnimalAge(json.data.age_approx)
        setAnimalSex(json.data.sex)
    }

    //Get Veterinario
    const getVetResp = async (id: string) => {
        let json = await vet.getVet(id)
        if (json.success) {
            setVetRespId(json.data.id)
            setVetRespName(json.data.name)
            setVetRespCrmv(json.data.crmv)
            setVetRespSpeciality(json.data.speciality)
            setVetRespPhone(json.data.phone)
        }
    }

    const data = { id: vetRespId, name: vetRespName, crmv: vetRespCrmv, speciality: vetRespSpeciality, phone: vetRespPhone }

    //Get Medical Record
    useEffect(() => {
        if (params.Id) {
            const loadMedical = async (id: string) => {
                let res = await medicalRecords.getMedicalRecord(id)
                if (res.success) {
                    let path = res.data.ItenFicha
                    setId(("000000" + res.data.id).slice(-6))
                    setDtCad(moment(res.data.date).format('DD/MM/YYYY'))
                    setStatus(res.data.status)
                    setLastChange(res.data.last_change)
                    setUser(res.data.user)
                    setObs(res.data.obs)
                    getAnimal(res.data.animals_id)
                    getVetResp(res.data.VetMedical[0].id)
                    setVetList(res.data.VetMedical)
                    setStatusMr(res.data.statusMR)
                    if (res.data.statusMR === 0) {
                        setTxtBtnBaixar('Baixar')
                        setLinkTo(`medical-records`)
                    } else {
                        setTxtBtnBaixar('Reabrir')
                        setLinkTo(`medical-closed`)
                    }
                    if (res.data.itens !== null) {
                        setlistItens(res.data.itens)
                        if (listItens) {
                            listItens.forEach((item, index) => {
                                console.log('Aqui', item?.qtdProduct)
                            })
                        }
                    }
                    if (res.data.events !== null) {
                        setEventsList(res.data.events)
                    }

                } else {
                    swal("Ops ", "" + 'Cadastro Não Encontrado', "error")
                        .then(() => {
                            window.location.href = '/medical-records'
                        })
                }
            }
            loadMedical(params.Id)
        }
    }, [])

    useEffect(() => {
        setLastChange(moment().format('DD/MM/YYYY'))
    }, [])

    const handleCreate = async () => {

        const data: any = { idMedicalRecord: id, status, lastChange, vetList, listItens, eventsList, idVets, idProducts, vetIdList, statusMr, stockQtd }
        const res = await medicalRecords.updateMedicalRecord(data)
        if (res.success) {
            swal(res.message, " ", "success")
                .then(() => {
                    stockQtd.forEach(async (item) => {
                        await stock.updateProductMedicalRecord(item)
                    })
                })
                .then(() => {
                    window.location.href = '/medical-records'
                })
        } else {
            swal("Error !", "" + JSON.stringify(res.message), "error")

        }
    }

    const handleStatusMr = () => {
        if (statusMr === 1) {
            setStatusMr(0)
            setTxtBtnBaixar('Baixar')
        } else {
            setStatusMr(1)
            setTxtBtnBaixar('Reabrir')
        }
    }

    useEffect(() => {
        console.log('Status: ', statusMr)
    }, [statusMr])

    return (
        <div className='container--medicalRecord-single'>
            <div className='formDetail'>
                <div className="topBar">
                    <div className="topBar-interno">
                        <div className="topBar-inputs">
                            <div className="boxId">
                                <label htmlFor="ipt-id">Código</label><br />
                                <input
                                    className='ipt-id'
                                    type="text"
                                    defaultValue={id}
                                    disabled
                                />
                            </div>
                            <div className="boxUser">
                                <label htmlFor="ipt-user">Usuário</label><br />
                                <input
                                    className='ipt-user'
                                    type="text"
                                    name='user'
                                    defaultValue={user}
                                    style={{ color: 'black' }}
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
                            <div className="boxStatus">
                                <label htmlFor="ipt-status">Status do Animal</label><br />
                                <select
                                    name=""
                                    id=""
                                    value={status}
                                    style={
                                        status === 'saudavel' ? { backgroundColor: '#16a685', color: 'white' } :
                                        status === 'observacao' ? { backgroundColor: '#f0d569' } :
                                        status === 'critico' ? { backgroundColor: '#ad2a2a', color: 'white' } :
                                        status === 'obito' ? { backgroundColor: '#abb8b7', color: 'white' } :
                                        { backgroundColor: 'white', color: 'black' }
                                    }
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="saudavel" style={{ backgroundColor: 'white', color: 'black' }}>SAUDÁVEL</option>
                                    <option value="observacao" style={{ backgroundColor: 'white', color: 'black' }}>OBSERVAÇÃO</option>
                                    <option value="critico" style={{ backgroundColor: 'white', color: 'black' }}>CRÍTICO</option>
                                    <option value="obito" style={{ backgroundColor: 'white', color: 'black' }}>ÓBITO</option>
                                </select>
                            </div>
                        </div>
                        <div className="topBar-Btn">
                            <input type="submit" value={txtBtnBaixar} className='btnBaixar' onClick={() => handleStatusMr()} />
                            <input type="submit" value="Salvar" className='btnSalvar' onClick={() => handleCreate()} />
                            <Link to={`/${linkTo}`}>
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
                            <fieldset className='fieldPetBox'>
                                <legend>Dados do Animal</legend>
                                <div className="boxPetId">
                                    <label htmlFor="ipt-idPet">Código</label><br />
                                    <input
                                        type="text"
                                        className='ipt-idPet'
                                        value={("000000" + animalId).slice(-6)}
                                        onBlur={() => getAnimal(animalId.toString())}
                                        disabled
                                    />
                                </div>
                                <div className="boxPetName">
                                    <label htmlFor="ipt-namePet">Nome</label><br />
                                    <input
                                        type="text"
                                        className='ipt-namePet'
                                        defaultValue={animalName}
                                        disabled
                                    />
                                </div>
                                <div className="boxPetSpecie">
                                    <label htmlFor="ipt-speciePet">Espécie</label><br />
                                    <input
                                        type="text"
                                        className='ipt-speciePet'
                                        defaultValue={animalSpecie}
                                        disabled
                                    />
                                </div>
                                <div className="boxPetTemperament">
                                    <label htmlFor="ipt-temperamentPet">Temperamento</label><br />
                                    <input
                                        type="text"
                                        className='ipt-temperamentPet'
                                        defaultValue={animalTemperament}
                                        disabled
                                    />
                                </div>
                                <div className="boxPetAge">
                                    <label htmlFor="ipt-agePet">Idade</label><br />
                                    <input
                                        type="text"
                                        className='ipt-agePet'
                                        value={animalAge}
                                        disabled
                                    />
                                </div>
                                <div className="boxPetSex">
                                    <label htmlFor="ipt-sexPet">Sexo</label><br />
                                    <input
                                        type="text"
                                        className='ipt-sexPet'
                                        defaultValue={animalSex}
                                        disabled
                                    />
                                </div>
                            </fieldset>
                            <fieldset className='fieldVetBox'>
                                <legend>Dados do Veterinário Responsável</legend>
                                <div className="boxVetId">
                                    <label htmlFor="ipt-idVet">Código</label><br />
                                    <input
                                        type="text"
                                        value={("000000" + vetRespId).slice(-6)}
                                        className='ipt-idVet'
                                        disabled
                                    />
                                </div>
                                <div className="boxVetName">
                                    <label htmlFor="ipt-nameVet">Nome</label><br />
                                    <input
                                        type="text"
                                        className='ipt-nameVet'
                                        defaultValue={vetRespName}
                                        disabled
                                    />
                                </div>
                                <div className="boxVetCrmv">
                                    <label htmlFor="ipt-crmvVet">CRMV</label><br />
                                    <input
                                        type="text"
                                        className='ipt-crmvVet'
                                        defaultValue={vetRespCrmv}
                                        disabled
                                    />
                                </div>
                                <div className="boxVetSpeciality">
                                    <label htmlFor="ipt-specialityVet">Especialidade</label><br />
                                    <input
                                        type="text"
                                        className='ipt-specialityVet'
                                        defaultValue={vetRespSpeciality}
                                        disabled
                                    />
                                </div>
                                <div className="boxVetPhone">
                                    <label htmlFor="ipt-phoneVet">Telefone</label><br />
                                    <input
                                        type="text"
                                        className='ipt-phoneVet'
                                        defaultValue={vetRespPhone}
                                        disabled
                                    />
                                </div>
                            </fieldset>
                            <fieldset className='fieldset--vetItens'>
                                <legend>Itens do Estoque</legend>
                                <div className="boxTabs">
                                    <div className="vetItens">
                                        <ul className='nav'>
                                            <li
                                                className={activeTab === 'obsTab' ? 'active' : ''}
                                                onClick={() => handleTab(0)}
                                            >
                                                Observações
                                            </li>
                                            <li
                                                className={activeTab === 'vetTab' ? 'active' : ''}
                                                onClick={() => handleTab(1)}
                                            >
                                                Veterinários
                                            </li>
                                            <li
                                                className={activeTab === 'itensTab' ? 'active' : ''}
                                                onClick={() => handleTab(2)}
                                            >
                                                Itens
                                            </li>
                                            <li
                                                className={activeTab === 'eventsTab' ? 'active' : ''}
                                                onClick={() => handleTab(3)}
                                            >
                                                Ocorrências
                                            </li>
                                        </ul>
                                        <div className="outLet">
                                            {
                                                activeTab === 'obsTab' ?
                                                    <div className='boxObs'>
                                                        <textarea
                                                            className='ipt-obs'
                                                            name=""
                                                            id=""
                                                            defaultValue={obs}
                                                            disabled
                                                        >
                                                        </textarea>
                                                    </div> :
                                                    activeTab === 'vetTab' ?
                                                        <VetTab list={vetList} setList={setVetList} vetResp={data} listItens={listItens} setIdVets={setIdVets} idVets={idVets} statusMr={statusMr} /> :
                                                        activeTab === 'itensTab' ?
                                                            <ItensTab list={listItens} setList={setlistItens} vetList={vetList} vetResp={data} idProducts={idProducts} setIdProducts={setIdProducts} vetIdList={vetIdList} setVetIdList={setVetIdList} user={user} statusMr={statusMr} setQtdMedical={setQtdMedical} setQtdStock={setStockQtd} qtdMedical={qtdMedical} qtdStock={stockQtd} /> :
                                                            activeTab === 'eventsTab' ?
                                                                <EventsTab list={eventsList} setList={setEventsList} vetList={vetList} vetResp={data} user={user} statusMr={statusMr} /> : null
                                            }
                                        </div>
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