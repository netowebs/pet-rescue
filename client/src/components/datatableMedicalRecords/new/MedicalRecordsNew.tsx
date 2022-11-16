import moment from 'moment';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './medicalrecordsnew.scss'
import swal from 'sweetalert'
import { vet } from '../../../api/apiVet';
import { pet } from '../../../api/api';
import { medicalRecords } from '../../../api/apiMedicalRecords';

export const MedicalRecordNew = () => {

    //Dados do lançamento
    const [dtCad, setDtCad] = useState(String)
    const [user, setUser] = useState(String)
    const [status, setStatus] = useState(String)
    const [obs, setObs] = useState(String)

    //Dados do animal
    const [animalId, setAnimalId] = useState(String)
    const [animalName, setAnimalName] = useState(String)
    const [animalSpecie, setAnimalSpecie] = useState(String)
    const [animalTemperament, setAnimalTemperament] = useState(String)
    const [animalAge, setAnimalAge] = useState(String)
    const [animalSex, setAnimalSex] = useState(String)

    //Dados do Veterinário Reponsável
    const [vetRespId, setVetRespId] = useState(String)
    const [vetRespCrmv, setVetRespCrmv] = useState(String)
    const [vetRespName, setVetRespName] = useState(String)
    const [vetRespSpeciality, setVetRespSpeciality] = useState(String)
    const [vetRespPhone, setVetRespPhone] = useState(String)

    //Get Animal
    const getAnimal = async (id: string) => {
        let json = await pet.getPet(id)
        if (json.success) {
            console.log(json.data)
            if (json.data.obito !== 'SIM') {
                setAnimalName(json.data.name.toUpperCase())
                setAnimalSpecie(json.data.species)
                setAnimalTemperament(json.data.temperament)
                setAnimalAge(json.data.age_approx)
                setAnimalSex(json.data.sex)
            } else {
                alert('Animal em óbito')
                setAnimalId('')
                setAnimalName('')
                setAnimalSpecie('')
                setAnimalTemperament('')
                setAnimalAge('')
                setAnimalSex('')
            }
        } else if (animalId.trim() !== '') {
            alert('Animal não encontrado')
            setAnimalId('')
            setAnimalName('')
            setAnimalSpecie('')
            setAnimalTemperament('')
            setAnimalAge('')
            setAnimalSex('')
        }
    }

    //Get Veterinario
    const getVet = async (id: string) => {
        let json = await vet.getVet(id)
        if (json.success) {
            setVetRespName(json.data.name.toUpperCase())
            setVetRespCrmv(json.data.crmv)
            setVetRespSpeciality(json.data.speciality)
            setVetRespPhone(json.data.phone)
        } else if (vetRespId.trim() !== '') {
            alert('Veterinário não encontrado')
            setVetRespId('')
            setVetRespCrmv('')
            setVetRespName('')
            setVetRespPhone('')
            setVetRespSpeciality('')
        }
    }

    const handleCreate = async () => {

        const data: any = { dtCad, user, status, obs, animalId, vetRespId, vetRespName, animalName }

        if (user.trim() !== '' && status.trim() !== '' && animalId !== null && vetRespId !== null) {
            const res = await medicalRecords.createMedicalRecord(data)
            console.log(res.message)
            if (res.success) {
                swal(res.message, " ", "success")
                    .then(() => {
                        window.location.href = '/medical-records'
                    })
            } else {
                swal("Error !", "" + JSON.stringify(res.message), "error")
            }
        } else {
            alert('Existem campos não preenchidos')
        }

    }

    useEffect(() => {
        setDtCad(moment().format('DD/MM/YYYY'))
    }, [dtCad])

    return (
        <div className='container--medicalRecord-new'>
            <div className='formDetail'>
                <div className="topBar">
                    <div className="topBar-interno">
                        <div className="topBar-inputs">
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
                                    name="ipt-status"
                                    id="ipt-status"
                                    onChange={(e) => setStatus(e.target.value)}
                                    defaultValue={'Selecione...'}
                                    style={
                                        status === 'saudavel' ? { backgroundColor: '#16a685', color: 'white' } :
                                            status === 'observacao' ? { backgroundColor: '#f0d569' } :
                                                status === 'critico' ? { backgroundColor: '#ad2a2a', color: 'white' } :
                                                    { backgroundColor: 'white', color: 'black' }
                                    }
                                >
                                    <option disabled style={{ backgroundColor: 'white', color: 'black' }}>Selecione...</option>
                                    <option value="saudavel" style={{ backgroundColor: 'white', color: 'black' }}>SAUDÁVEL</option>
                                    <option value="observacao" style={{ backgroundColor: 'white', color: 'black' }}>OBSERVAÇÃO</option>
                                    <option value="critico" style={{ backgroundColor: 'white', color: 'black' }}>CRÍTICO</option>
                                </select>
                            </div>
                        </div>
                        <div className="topBar-Btn">
                            <input type="submit" value="Salvar" className='btnSalvar' onClick={() => handleCreate()} />
                            <Link to={'/medical-records'}>
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
                                        value={animalId}
                                        onChange={(e) => setAnimalId(e.target.value)}
                                        onBlur={() => getAnimal(animalId.toString())}
                                    />
                                </div>
                                <div className="boxPetName">
                                    <label htmlFor="ipt-namePet">Nome</label><br />
                                    <input
                                        type="text"
                                        className='ipt-namePet'
                                        value={animalName.toUpperCase()}
                                        disabled
                                    />
                                </div>
                                <div className="boxPetSpecie">
                                    <label htmlFor="ipt-speciePet">Espécie</label><br />
                                    <input
                                        type="text"
                                        className='ipt-speciePet'
                                        value={animalSpecie.toUpperCase()}
                                        disabled
                                    />
                                </div>
                                <div className="boxPetTemperament">
                                    <label htmlFor="ipt-temperamentPet">Temperamento</label><br />
                                    <input
                                        type="text"
                                        className='ipt-temperamentPet'
                                        value={animalTemperament.toUpperCase()}
                                        disabled
                                    />
                                </div>
                                <div className="boxPetAge">
                                    <label htmlFor="ipt-agePet">Idade</label><br />
                                    <input
                                        type="text"
                                        className='ipt-agePet'
                                        value={animalAge.toUpperCase()}
                                        disabled
                                    />
                                </div>
                                <div className="boxPetSex">
                                    <label htmlFor="ipt-sexPet">Sexo</label><br />
                                    <input
                                        type="text"
                                        className='ipt-sexPet'
                                        value={animalSex.toUpperCase()}
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
                                        value={vetRespId}
                                        className='ipt-idVet'
                                        onChange={(e) => setVetRespId(e.target.value)}
                                        onBlur={() => getVet(vetRespId)}
                                    />
                                </div>
                                <div className="boxVetName">
                                    <label htmlFor="ipt-nameVet">Nome</label><br />
                                    <input
                                        type="text"
                                        className='ipt-nameVet'
                                        value={vetRespName.toUpperCase()}
                                        disabled
                                    />
                                </div>
                                <div className="boxVetCrmv">
                                    <label htmlFor="ipt-crmvVet">CRMV</label><br />
                                    <input
                                        type="text"
                                        className='ipt-crmvVet'
                                        value={vetRespCrmv.toUpperCase()}
                                        disabled
                                    />
                                </div>
                                <div className="boxVetSpeciality">
                                    <label htmlFor="ipt-specialityVet">Especialidade</label><br />
                                    <input
                                        type="text"
                                        className='ipt-specialityVet'
                                        value={vetRespSpeciality.toUpperCase()}
                                        disabled
                                    />
                                </div>
                                <div className="boxVetPhone">
                                    <label htmlFor="ipt-phoneVet">Telefone</label><br />
                                    <input
                                        type="text"
                                        className='ipt-phoneVet'
                                        value={vetRespPhone}
                                        disabled
                                    />
                                </div>
                            </fieldset>
                            <fieldset className='fieldset--vetItens'>
                                <legend>Itens do Estoque</legend>
                                <div className="boxObs">
                                    <label htmlFor="ipt-obs">Observações e informações úteis</label><br />
                                    <textarea
                                        name="ipt-obs"
                                        id="ipt-obs"
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