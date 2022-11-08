//import PrintIcon from '@mui/icons-material/Print';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './adoptionnew.scss'
import swal from 'sweetalert'
import { pet } from '../../../api/api';
import { tutor } from '../../../api/apiTutors';
import { adoption } from '../../../api/apiAdoption';

export const AdoptionNew = () => {

    //Dados do lançamento
    const [dtCad, setDtCad] = useState(String)
    const [user, setUser] = useState(String)
    const [obs, setObs] = useState(String)

    //Dados do animal
    const [animalId, setAnimalId] = useState(String)
    const [animalName, setAnimalName] = useState(String)
    const [animalSpecie, setAnimalSpecie] = useState(String)
    const [animalTemperament, setAnimalTemperament] = useState(String)
    const [animalAge, setAnimalAge] = useState(String)
    const [animalSex, setAnimalSex] = useState(String)
    const [animalStatus, setAnimalStatus] = useState(String)

    //Dados do Tutor
    const [tutorId, setTutorId] = useState(String)
    const [tutorName, setTutorName] = useState(String)
    const [tutorCpf, setTutorCpf] = useState(String)
    const [tutorAddress, setTutorAddress] = useState(String)
    const [tutorAdressNum, setTutorAdressNum] = useState(String)
    const [tutorPhone, setTutorPhone] = useState(String)

    //Get Animal
    const getAnimal = async (id: string) => {
        let json = await pet.getPet(id)
        if (json.success) {
            setAnimalName(json.data.name.toUpperCase())
            setAnimalSpecie(json.data.species)
            setAnimalTemperament(json.data.temperament)
            setAnimalAge(json.data.age_approx)
            setAnimalSex(json.data.sex)
            setAnimalStatus(json.data.status)

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

    const getTutor = async (id: string) =>{
        let json = await tutor.getTutor(id)
        if(json){
            setTutorName(json.data.name)
            setTutorCpf(json.data.cpf)
            setTutorAddress(json.data.address)
            setTutorAdressNum(json.data.address_num)
            setTutorPhone(json.data.phone)
        }else{
            alert('Tutor não encontrado')
            setTutorId('')
            setTutorName('')
            setTutorCpf('')
            setTutorAddress('')
            setTutorAdressNum('')
            setTutorPhone('')

        }
    }

    const handleCreate = async () => {

        const data: any = { animalId, tutorId, user }

        if(animalStatus === 'INDISPONIVEL'){
            alert('Esse animal não está disponível para adoção, verifique se existe ficha médica aberta')
        }else{
            if (user.trim() !== '' && animalId !== null && tutorId !== null) {
                const res = await adoption.createAdoption(data)
                if (res.success) {
                    swal(res.message, " ", "success")
                        .then(async() => {
                            window.location.href = '/adoptions'
                        })
                } else {
                    swal("Error !", "" + JSON.stringify(res.message), "error")
                }
            }else{
                alert('Existem campos não preenchidos')
            }
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
                        </div>
                        <div className="topBar-Btn">
                            <input type="submit" value="Salvar" className='btnSalvar' onClick={() => handleCreate()}/>
                            <Link to={'/adoptions'}>
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
                            <fieldset className='fieldTutorBox'>
                                <legend>Dados do Tutor</legend>
                                <div className="boxTutorId">
                                    <label htmlFor="ipt-idTutor">Código</label><br />
                                    <input
                                        type="text"
                                        value={tutorId}
                                        className='ipt-idTutor'
                                        onChange={(e) => setTutorId(e.target.value)}
                                        onBlur={() => getTutor(tutorId)}
                                    />
                                </div>
                                <div className="boxTutorName">
                                    <label htmlFor="ipt-nameTutor">Nome</label><br />
                                    <input
                                        type="text"
                                        className='ipt-nameTutor'
                                        value={tutorName.toUpperCase()}
                                        disabled
                                    />
                                </div>
                                <div className="boxTutorCpf">
                                    <label htmlFor="ipt-cpfTutor">CPF</label><br />
                                    <input
                                        type="text"
                                        className='ipt-cpfTutor'
                                        value={tutorCpf.toUpperCase()}
                                        disabled
                                    />
                                </div>
                                <div className="boxTutorPhone">
                                    <label htmlFor="ipt-phoneTutor">Telefone</label><br />
                                    <input
                                        type="text"
                                        className='ipt-phoneTutor'
                                        value={tutorPhone.toUpperCase()}
                                        disabled
                                    />
                                </div>
                                <div className="boxTutorAddress">
                                    <label htmlFor="ipt-addressTutor">Endereço</label><br />
                                    <input
                                        type="text"
                                        className='ipt-addressTutor'
                                        value={tutorAddress.toUpperCase()}
                                        disabled
                                    />
                                </div>
                                <div className="boxTutorAddressNum">
                                    <label htmlFor="ipt-addressNumTutor">Número</label><br />
                                    <input
                                        type="text"
                                        className='ipt-addressNumTutor'
                                        value={tutorAdressNum}
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