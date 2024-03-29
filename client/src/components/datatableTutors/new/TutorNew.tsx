import moment from 'moment';
import {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import './tutornew.scss'
import swal from 'sweetalert'
import { viaCep } from '../../../api/apiViaCep';
import { tutor } from '../../../api/apiTutors';
import { AuthContext } from '../../../contexts/Auth/AuthContex';


export const TutorNew = () => {

    const auth = useContext(AuthContext)

    const [user, setUser] = useState(auth.user?.username)

    //UseState Inputs
    const [dtCad, setDtCad] = useState(String)
    const [name, setName] = useState(String)
    const [phone, setPhone] = useState(String)
    const [cpf, setCpf] = useState(String)
    const [rg, setRg] = useState(String)
    const [nasc, setNasc] = useState(String)
    const [sex, setSex] = useState(String)

    //UseState Address
    const [street, setStreet] = useState(String)
    const [num, setNum] = useState(Number)
    const [complement, setComplement] = useState(String)
    const [districtName, setDistrictName] = useState(String)
    const [cep, setCep] = useState(String)
    const [city, setCity] = useState(String)
    const [state, setState] = useState(String)

    const getCep = async (cep: string) => {
        let json = await viaCep.getCep(cep)
        setStreet(json.logradouro)
        setDistrictName(json.bairro)
        setCity(json.localidade)
        setState(json.uf)
    }

    useEffect(() => {
        setDtCad(moment().format('DD/MM/YYYY'))
    }, [dtCad])

    //Function Create
    const handleCreate = async () => {
        const data: any = { name, cpf, rg, nasc, sex, phone, cep, street, num, complement, districtName, city, state}

        if (name == '' && cpf == '' && rg == '' && nasc == '' && sex == '' && phone === ''  && cep == '' && street == '' && num == null && districtName == '' && city == '' && state == '') {
            alert('Existem campos vazios')
        } else {
            const res = await tutor.createTutor(data)
            if (res.success) {
                swal(res.message, " ", "success")
                    .then(() => {
                        window.location.href = '/tutors'
                    })
            } else {
                swal("Error !", "" + JSON.stringify(res.message), "error")
            }
        }
    }

    return (
        <div className='container--tutor-new'>
            <div className='formDetail'>
                <div className="topBar">
                    <div className="topBar-interno">
                        <div className="topBar-inputs">
                            <div className="boxId">
                                <label htmlFor="ipt-user">Usuário</label><br />
                                <input
                                    className='ipt-user'
                                    type="text"
                                    defaultValue={user}
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
                            <Link to={'/tutors'}>
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
                            <div className="boxName">
                                <label htmlFor="ipt-name">Nome</label><br />
                                <input
                                    className='ipt-name'
                                    type="text"
                                    name='nome'
                                    onChange={
                                        (e) => setName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="boxCpf">
                                <label htmlFor="ipt-cpf">CPF</label><br />
                                <input className='ipt-cpf' type="text"
                                    name='cpf'
                                    onChange={
                                        (e) => setCpf(e.target.value)
                                    }

                                />
                            </div>
                            <div className="boxRg">
                                <label htmlFor="ipt-rg">RG</label><br />
                                <input
                                    type="text"
                                    className='ipt-rg'
                                    onChange={(e) => setRg(e.target.value)}
                                />
                            </div>
                            <div className="boxNasc">
                                <label htmlFor="ipt-nasc">Nascimento</label><br />
                                <input
                                    className='ipt-nasc'
                                    type="date"
                                    onChange={
                                        (e) => setNasc(moment(e.target.value).format('YYYY-MM-DD'))
                                    }
                                />
                            </div>
                            <div className="boxSex">
                                <label htmlFor="ipt-sex">Sexo</label><br />
                                <select 
                                    name="" 
                                    id=""
                                    onChange={(e) => setSex(e.target.value)}
                                >
                                    <option value="F">Feminino</option>
                                    <option value="M">Masculino</option>
                                </select>
                            </div>
                            <div className="boxPhone">
                                <label htmlFor="ipt-phone">Telefone</label><br />
                                <input
                                    className='ipt-sex'
                                    type="text"
                                    onChange={
                                        (e) => setPhone(e.target.value)
                                    }
                                />
                            </div>
                            <fieldset className='fieldset--endereco'>
                                <legend>Endereço</legend>
                                <div className="boxCep">
                                    <label htmlFor="ipt-cep">CEP</label><br />
                                    <input 
                                        type="text"
                                        value={cep}
                                        className='ipt-cep'
                                        onChange={(e) => setCep(e.target.value)}
                                        onBlur={() => getCep(cep)}
                                    />
                                </div>
                                <div className="boxStreet">
                                    <label htmlFor="ipt-street">Rua:</label><br />
                                    <input 
                                    type="text"
                                    value={street}
                                    className='ipt-street'
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                                </div>
                                <div className="boxStrNum">
                                    <label htmlFor="ipt-num">Número</label><br />
                                    <input 
                                        type="text"
                                        value={num}
                                        className='ipt-num'
                                        onChange={(e) => setNum(parseInt(e.target.value))}
                                    />
                                </div>
                                <div className="boxComplement">
                                    <label htmlFor="ipt-complement">Complemento</label><br />
                                    <input 
                                        type="text"
                                        value={complement}
                                        className='ipt-complement'
                                        onChange={(e) => setComplement(e.target.value)}
                                    />
                                </div>
                                <div className="boxDistrict">
                                    <label htmlFor="ipt-district">Bairro</label><br />
                                    <input 
                                        type="text"
                                        value={districtName}
                                        className='ipt-district'
                                        onChange={(e) => setDistrictName(e.target.value)}
                                    />
                                </div>
                                
                                <div className="boxCidade">
                                    <label htmlFor="ipt-cidade">Cidade</label><br />
                                    <input 
                                        type="text"
                                        value={city}
                                        className='ipt-cidade'
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>
                                <div className="boxUF">
                                    <label htmlFor="ipt-uf">Estado</label><br />
                                    <select 
                                        name="" 
                                        id=""
                                        value={state}
                                        onChange={
                                            (e) => setState(e.target.value)
                                        }
                                    >
                                        <option value=""></option>
                                        <option value="AC">ACRE</option>
                                        <option value="AL">ALAGOAS</option>
                                        <option value="AP">AMAPÁ</option>
                                        <option value="AM">AMAZONAS</option>
                                        <option value="BA">BAHIA</option>
                                        <option value="CE">CEARÁ</option>
                                        <option value="DF">DISTRITO FEDERAL</option>
                                        <option value="ES">ESPÍRITO SANTO</option>
                                        <option value="GO">GOIÁS</option>
                                        <option value="MA">MARANHÃO</option>
                                        <option value="MT">MATO GROSSO</option>
                                        <option value="MS">MATO GROSSO DO SUL</option>
                                        <option value="MG">MINAS GERAIS</option>
                                        <option value="PA">PARÁ</option>
                                        <option value="PB">PARAÍBA</option>
                                        <option value="PR">PARANÁ</option>
                                        <option value="PE">PERNAMBUCO</option>
                                        <option value="PI">PIAUÍ</option>
                                        <option value="RJ">RIO DE JANEIRO</option>
                                        <option value="RN">RIO GRANDE DO NORTE</option>
                                        <option value="RS">RIO GRANDE DO SUL</option>
                                        <option value="RO">RONDÔNIA</option>
                                        <option value="RR">RORAIMA</option>
                                        <option value="SC">SANTA CATARINA</option>
                                        <option value="SP">SÃO PAULO</option>
                                        <option value="SE">SERGIPE</option>
                                        <option value="TO">TOCANTINS</option>
                                    </select>

                                    {/* <input 
                                        type="text"
                                        value={state}
                                        className='ipt-uf'
                                        onChange={(e) => setState(e.target.value)}
                                    /> */}
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}