import moment from 'moment';
import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import './collaboratorssingle.scss'
import swal from 'sweetalert'
import { viaCep } from '../../../api/apiViaCep';
import { collab } from '../../../api/apiCollab';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { AuthContext } from '../../../contexts/Auth/AuthContex';

export const CollaboratorsSingle = () => {

    const params = useParams()

    const auth = useContext(AuthContext)

    const [idCad, setIdCad] = useState(String)
    const [dtCad, setDtCad] = useState(String)
    const [name, setName] = useState(String)
    const [cpf, setCpf] = useState(String)
    const [rg, setRg] = useState(String)
    const [sex, setSex] = useState(String)
    const [phone, setPhone] = useState(String)
    const [cep, setCep] = useState(String)
    const [street, setStreet] = useState(String)
    const [num, setNum] = useState(Number)
    const [complement, setComplement] = useState(String)
    const [district, setDistrict] = useState(String)
    const [city, setCity] = useState(String)
    const [state, setState] = useState(String)
    const [nasc, setNasc] = useState(String)
    const [password, setPassword] = useState(String)
    const [nivel, setNivel] = useState(0)
    const [username, setUsername] = useState(String)
    const [dtAdmission, setDtAdmission] = useState(String)
    const [cargo, setCargo] = useState(String)
    const [setor, setSetor] = useState(String)
    const [ativo, setAtivo] = useState(1)

    const [showPassword, setShowPassword] = useState(false)
    const [photo, setPhoto] = useState<FileList>()

    const handlePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target
        if (files && files.length > 0) {
            setPhoto(files)
        }
    }

    const togglePass = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        if (params.Id) {
            const loadCollaborator = async (id: string) => {
                let res = await collab.getCollab(id)

                if (res.success) {
                    setIdCad(("000000" + res.data.id).slice(-6))
                    setDtCad(moment(res.data.dtCad).format('DD/MM/YYYY'))
                    setName(res.data.name)
                    setCpf(res.data.cpf)
                    setRg(res.data.rg)
                    setSex(res.data.sex)
                    setPhone(res.data.phone)
                    setCep(res.data.cep)
                    setStreet(res.data.address)
                    setNum(res.data.num)
                    setComplement(res.data.complement)
                    setDistrict(res.data.district)
                    setCity(res.data.city)
                    setState(res.data.uf)
                    setNasc(res.data.date_birth)
                    setDtAdmission(res.data.dtAdmission)
                    setCargo(res.data.cargo)
                    setSetor(res.data.setor)
                    setAtivo(res.data.ativo)
                    setUsername(res.data.username)
                    setNivel(res.data.nivel)
                } else {
                    swal("Ops ", "" + 'Cadastro Não Encontrado', "error")
                        .then(() => {
                            window.location.href = '/collaborators'
                        })
                }
            }
            loadCollaborator(params.Id)

        }
    }, [])

    const getCep = async (cep: string) => {
        let json = await viaCep.getCep(cep)
        setStreet(json.logradouro)
        setDistrict(json.bairro)
        setCity(json.localidade)
        setState(json.uf)
    }

    const handleDelete = async () => {
        if (idCad) {
            const res = await collab.deleteCollab(idCad)
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

    const handleUpdate = async () => {

        let data: any = {}

        if(ativo === 0){
            setUsername('')
        }

        const formData = new FormData()
        if (photo) {
            formData.append('image', photo[0], `${username.replace(/\s/g, '')}.jpg`)
        }

        if (password.trim() === '') {
            data = { idCad, name, cpf, rg, nasc, sex, phone, cep, street, num, complement, district, city, state, nivel, username, dtAdmission, cargo, setor, ativo, formData }
        } else {
            data = { idCad, name, cpf, rg, nasc, sex, phone, cep, street, num, complement, district, city, state, password, nivel, username, dtAdmission, cargo, setor, ativo, formData }
        }

        const res = await collab.updateCollab(data)
        if (res.success) {
            swal(res.message, " ", "success",)
                .then(async () => {
                    await collab.photoUpload(formData)
                    window.location.href = '/collaborators'
                })
        } else {
            swal("Error !", "" + JSON.stringify(res.message), "error")
        }
    }

    return (
        <div className='container--collaborator-single'>
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
                                <label htmlFor="ipt-dtCad">Data Cadastro</label><br />
                                <input
                                    className='ipt-dtCad'
                                    type="text"
                                    defaultValue={dtCad}
                                    disabled
                                />
                            </div>
                            <div className="boxPhoto">
                                <label htmlFor="ipt-photo">Carregar Foto</label><br />
                                <input
                                    type="file"
                                    accept='image/*'
                                    formEncType='multipart/form-data'
                                    onChange={handlePhoto}
                                />
                            </div>
                        </div>
                        <div className="topBar-Btn">
                            <input type="submit" value="Salvar" className='btnSalvar' onClick={() => handleUpdate()} />
                            <Link to={'/collaborators'}>
                                <input type="button" value="Cancelar" className='btnCancelar' />
                            </Link>
                            <input type="button" value="Excluir" className='btnExcluir' onClick={() => handleDelete()} />
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
                                    defaultValue={name}
                                    onChange={
                                        (e) => setName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="boxCpf">
                                <label htmlFor="ipt-cpf">CPF</label><br />
                                <input className='ipt-cpf' type="text"
                                    name='cpf'
                                    defaultValue={cpf}
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
                                    defaultValue={rg}
                                    onChange={(e) => setRg(e.target.value)}
                                />
                            </div>
                            <div className="boxNasc">
                                <label htmlFor="ipt-nasc">Nascimento</label><br />
                                <input
                                    className='ipt-nasc'
                                    type="date"
                                    value={nasc}
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
                                    defaultValue={phone}
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
                                        defaultValue={cep}
                                        className='ipt-cep'
                                        onChange={(e) => setCep(e.target.value)}
                                        onBlur={() => getCep(cep)}
                                    />
                                </div>
                                <div className="boxStreet">
                                    <label htmlFor="ipt-street">Rua:</label><br />
                                    <input
                                        type="text"
                                        defaultValue={street}
                                        className='ipt-street'
                                        onChange={(e) => setStreet(e.target.value)}
                                    />
                                </div>
                                <div className="boxStrNum">
                                    <label htmlFor="ipt-num">Número</label><br />
                                    <input
                                        type="text"
                                        defaultValue={num}
                                        className='ipt-num'
                                        onChange={(e) => setNum(parseInt(e.target.value))}
                                    />
                                </div>
                                <div className="boxComplement">
                                    <label htmlFor="ipt-complement">Complemento</label><br />
                                    <input
                                        type="text"
                                        defaultValue={complement}
                                        className='ipt-complement'
                                        onChange={(e) => setComplement(e.target.value)}
                                    />
                                </div>
                                <div className="boxDistrict">
                                    <label htmlFor="ipt-district">Bairro</label><br />
                                    <input
                                        type="text"
                                        defaultValue={district}
                                        className='ipt-district'
                                        onChange={(e) => setDistrict(e.target.value)}
                                    />
                                </div>
                                <div className="boxCidade">
                                    <label htmlFor="ipt-cidade">Cidade</label><br />
                                    <input
                                        type="text"
                                        defaultValue={city}
                                        className='ipt-cidade'
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>
                                <div className="boxUF">
                                    <label htmlFor="ipt-uf">Estado</label><br />
                                    <select
                                        name="state"
                                        id="state"
                                        value={state}
                                        onChange={
                                            (e) => setState(e.target.value)
                                        }
                                    >
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
                                        value={dtAdmission}
                                        onChange={(e) => setDtAdmission(e.target.value)}
                                    />
                                </div>
                                <div className="boxCargo">
                                    <label htmlFor="ipt-cargo">Cargo</label><br />
                                    <input
                                        type="text"
                                        value={cargo}
                                        className='ipt-cargo'
                                        onChange={(e) => setCargo(e.target.value)}
                                    />
                                </div>
                                <div className="boxSetor">
                                    <label htmlFor="ipt-setor">Setor</label><br />
                                    <input
                                        type="text"
                                        className='ipt-setor'
                                        value={setor}
                                        onChange={(e) => setSetor(e.target.value)}
                                    />
                                </div>
                                <div className="boxAtivo">
                                    {
                                        auth.user?.id === parseInt(idCad) &&
                                        <>
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
                                        </>
                                    }
                                </div>
                            </fieldset>
                            {
                                ativo === 1 &&
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
                                            <VisibilityOffIcon onClick={togglePass} /> :
                                            <VisibilityIcon onClick={togglePass} />
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
                                            checked={nivel === 1 ? true : false}
                                        />
                                    </div>
                                    <div className="user">
                                        <label htmlFor="nivel">Usuário:</label>
                                        <input
                                            type="radio"
                                            name='nivel'
                                            className='ipt-user'
                                            onChange={() => setNivel(0)}
                                            checked={nivel === 0 ? true : false}
                                        />
                                    </div>
                                </div>
                            </fieldset>
                            }
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}