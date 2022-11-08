//import PrintIcon from '@mui/icons-material/Print';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './adoptionsingle.scss'
import swal from 'sweetalert'
import { pet } from '../../../api/api';
import { adoption } from '../../../api/apiAdoption';
import { tutor } from '../../../api/apiTutors';

export const AdoptionSingle = () => {

    const params = useParams()

    //Dados do lançamento
    const [dtCad, setDtCad] = useState(String)
    const [id, setId] = useState(String)
    const [status, setStatus] = useState(String)
    const [obs, setObs] = useState(String)
    const [user, setUser] = useState(String)

    //Dados do animal
    const [animalId, setAnimalId] = useState(String)
    const [animalName, setAnimalName] = useState(String)
    const [animalSpecie, setAnimalSpecie] = useState(String)
    const [animalTemperament, setAnimalTemperament] = useState(String)
    const [animalAge, setAnimalAge] = useState(String)
    const [animalSex, setAnimalSex] = useState(String)

    //Dados do Tutor
    const [tutorId, setTutorId] = useState(String)
    const [tutorName, setTutorName] = useState(String)
    const [tutorCpf, setTutorCpf] = useState(String)
    const [tutorPhone, setTutorPhone] = useState(String)
    const [tutorAddress, setTutorAddress] = useState(String)
    const [tutorAddressNum, setTutorAddressNum] = useState(Number)

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

    //Get Tutor
    const getTutor = async (id: string) => {
        let json = await tutor.getTutor(id)
        if (json.success) {
            setTutorId(json.data.id)
            setTutorName(json.data.name)
            setTutorCpf(json.data.cpf)
            setTutorPhone(json.data.phone)
            setTutorAddress(json.data.address)
            setTutorAddressNum(json.data.address_num)
        }
    }

    //Get Adoption
    useEffect(() => {
        if (params.Id) {
            const loadAdoption = async (id: string) => {
                let res = await adoption.getAdotpion(id)
                if (res.success) {
                    setId(("000000" + res.data.id).slice(-6))
                    setDtCad(moment(res.data.date).format('DD/MM/YYYY'))
                    getAnimal(res.data.id_animal)
                    getTutor(res.data.id_tutor)
                    setObs(res.data.obs)
                    setUser(res.data.user)
                } else {
                    swal("Ops ", "" + 'Cadastro Não Encontrado', "error")
                        .then(() => {
                            window.location.href = '/adoptions'
                        })
                }
            }
            loadAdoption(params.Id)
        }
    }, [])

    const handleDelete = async () => {
        if (params.Id) {
            const res = await adoption.deleteAdoption(params.Id)
            if (res.success) {
                swal(res.message, " ", "success")
                    .then(() => {
                        window.location.href = '/adoptions'
                    })
            } else {
                swal("Error !", "" + JSON.stringify(res.message), "error")
            }
        }
    }


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
                        </div>
                        <div className="topBar-Btn">
                            <input type="button" value="Excluir" className='btnExcluir' onClick={() => handleDelete()} />
                            <Link to={`/adoptions`}>
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
                                <legend>Dados do Tutor</legend>
                                <div className="boxVetId">
                                    <label htmlFor="ipt-idTutor">Código</label><br />
                                    <input
                                        type="text"
                                        value={("000000" + tutorId).slice(-6)}
                                        className='ipt-idTutor'
                                        disabled
                                    />
                                </div>
                                <div className="boxTutorName">
                                    <label htmlFor="ipt-nameTutor">Nome</label><br />
                                    <input
                                        type="text"
                                        className='ipt-nameTutor'
                                        defaultValue={tutorName.toUpperCase()}
                                        disabled
                                    />
                                </div>
                                <div className="boxTutorCpf">
                                    <label htmlFor="ipt-cpfTutor">CPF</label><br />
                                    <input
                                        type="text"
                                        className='ipt-cpfTutor'
                                        defaultValue={tutorCpf}
                                        disabled
                                    />
                                </div>
                                <div className="boxTutorPhone">
                                    <label htmlFor="ipt-phoneTutor">Telefone</label><br />
                                    <input
                                        type="text"
                                        className='ipt-phoneTutor'
                                        defaultValue={tutorPhone}
                                        disabled
                                    />
                                </div>
                                <div className="boxTutorAddress">
                                    <label htmlFor="ipt-addressTutor">Endereço</label><br />
                                    <input
                                        type="text"
                                        className='ipt-addressTutor'
                                        defaultValue={tutorAddress.toUpperCase()}
                                        disabled
                                    />
                                </div>
                                <div className="boxTutorAddressNum">
                                    <label htmlFor="ipt-numTutor">N°</label><br />
                                    <input
                                        type="text"
                                        className='ipt-numTutor'
                                        defaultValue={tutorAddressNum}
                                        disabled
                                    />
                                </div>
                            </fieldset>
                            <fieldset className='fieldset--obsAdoption'>
                            <legend>Observações da Adoção</legend>
                                <div className="boxObs">
                                    <label htmlFor="ipt-obs">Observações e informações úteis</label><br />
                                    <textarea
                                        name="ipt-obs"
                                        id="ipt-obs"
                                        onChange={(e) => setObs(e.target.value)}
                                        disabled
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