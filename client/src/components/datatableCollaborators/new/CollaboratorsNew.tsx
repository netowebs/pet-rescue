import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './collaboratorsnew.scss'
import swal from 'sweetalert'
import { viaCep } from '../../../api/apiViaCep';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { collab } from '../../../api/apiCollab';

type AptModel = {
    id: number,
    name: string
}

export const CollaboratorsNew = () => {

    const params = useParams()

    //UseState Inputs
    const [dtCad, setDtCad] = useState(String)
    const [name, setName] = useState(String)
    const [phone, setPhone] = useState(String)
    const [cpf, setCpf] = useState(String)
    const [rg, setRg] = useState(String)
    const [nasc, setNasc] = useState(String)
    const [sex, setSex] = useState(String)
    const [password, setPassword] = useState(String)
    const [nivel, setNivel] = useState(0)
    const [username, setUsername] = useState(String)
    const [dtAdmission, setDtAdmission] = useState(String)
    const [cargo, setCargo] = useState(String)
    const [setor, setSetor] = useState(String)
    const [ativo, setAtivo] = useState(1)

    const [showPassword, setShowPassword] = useState(false)

    const togglePass = () => {
        setShowPassword(!showPassword)
    }

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
        const handleUsername = () => {
            let firstName = name.split(' ').slice(0, 1).join(' ')
            let lastName = name.split(' ').slice(-1).join(' ')
            setUsername(`${firstName} ${lastName}`)
        }
        if (ativo === 1) {
            handleUsername()
        }else{
            setUsername('')
        }
    })

    useEffect(() => {
        setDtCad(moment().format('DD/MM/YYYY'))
    }, [dtCad])

    //Function Create
    const handleCreate = async () => {
        const data: any = { name, cpf, rg, nasc, sex, phone, cep, street, num, complement, districtName, city, state, password, nivel, username, dtAdmission, cargo, setor, ativo }

        if (name.trim() === '' && cpf.trim() === '' && rg.trim() === '' && nasc.trim() === '' && sex.trim() === '' && phone.trim() === '' && cep.trim() === '' && street.trim() === '' && num === null && complement.trim() === '' && districtName.trim() === '' && city.trim() === '' && state.trim() === '') {
            alert('Existem campos vazios')
        } else{
            const res = await collab.createCollab(data)
            if (res.success) {
                swal(res.message, " ", "success")
                    .then(() => {
                        window.location.href = '/collaborators'
                    })
            } else {
                swal("Error !", "" + JSON.stringify(res.message), "error")
            }
        }
    }

    return (
        <div className='container--collaborator-new'>
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
                            <div className="boxPhoto">
                                <label htmlFor="ipt-photo">Carregar Foto</label><br />
                                <input
                                    className='ipt-photo'
                                    type="file"
                                    accept='image/*'
                                />
                            </div>
                        </div>
                        <div className="topBar-Btn">
                            <input type="submit" value="Salvar" className='btnSalvar' onClick={() => handleCreate()} />
                            <Link to={'/collaborators'}>
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
                                    className='ipt-sex'
                                    name="sex" 
                                    id="sex"
                                    value={sex}
                                    onChange={
                                        (e) => setSex(e.target.value)
                                    }
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
                                        onChange={(e) => setState(e.target.value)}
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
                                </div>
                            </fieldset>
                            <fieldset className='fieldset--contrato'>
                                <legend>Contrato</legend>
                                <div className="boxDtAdmission">
                                    <label htmlFor="ipt-dtAdmission">Admissão</label><br />
                                    <input
                                        type="date"
                                        className='ipt-dtAdmission'
                                        onChange={(e) => setDtAdmission(e.target.value)}
                                    />
                                </div>
                                <div className="boxCargo">
                                    <label htmlFor="ipt-cargo">Cargo</label><br />
                                    <input
                                        type="text"
                                        className='ipt-cargo'
                                        onChange={(e) => setCargo(e.target.value)}
                                    />
                                </div>
                                <div className="boxSetor">
                                    <label htmlFor="ipt-setor">Função</label><br />
                                    <input
                                        type="text"
                                        className='ipt-setor'
                                        onChange={(e) => setSetor(e.target.value)}
                                    />
                                </div>
                                <div className="boxAtivo">
                                    <div className="sim">
                                        <label htmlFor="ativo">Ativo:</label>
                                        <input
                                            type="radio"
                                            name='ativo'
                                            className='ipt-ativo'
                                            defaultChecked
                                            onChange={() => setAtivo(1)}
                                        />
                                    </div>
                                    <div className="nao">
                                        <label htmlFor="ativo">Inativo:</label>
                                        <input
                                            type="radio"
                                            name='ativo'
                                            className='ipt-inativo'
                                            onChange={() => setAtivo(0)}
                                        />
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset className='fieldset--acesso'>
                                <legend>Acesso</legend>
                                <div className="boxUsername">
                                    <label htmlFor="ipt-username">Usuário</label><br />
                                    <input
                                        type="text"
                                        className='ipt-username'
                                        defaultValue={username}
                                    />
                                </div>
                                <div className="boxPassword">
                                    <label htmlFor="ipt-password">Senha</label><br />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className='ipt-password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="btnPass">
                                    {
                                        showPassword ? 
                                        <VisibilityOffIcon onClick={togglePass}/> : 
                                        <VisibilityIcon onClick={togglePass}/>
                                    }
                                </div>
                                <div className="boxNivel">
                                    <div className="adm">
                                        <label htmlFor="nivel">Admin:</label>
                                        <input
                                            type="radio"
                                            name='nivel'
                                            className='ipt-adm'
                                            onChange={() => setNivel(1)}
                                        />
                                    </div>
                                    <div className="user">
                                        <label htmlFor="nivel">Usuário:</label>
                                        <input
                                            type="radio"
                                            name='nivel'
                                            className='ipt-user'
                                            onChange={() => setNivel(0)}
                                            defaultChecked
                                        />
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