
import moment from 'moment';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './tutorsingle.scss'
import swal from 'sweetalert'
import { viaCep } from '../../../api/apiViaCep';
import { tutor } from '../../../api/apiTutors';

export const TutorSingle = () => {

    const params = useParams()

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

    useEffect(() => {
        if (params.Id) {
            const loadTutor = async (id: string) => {
                let res = await tutor.getTutor(id)
                if (res.success) {
                    setIdCad(("000000" + res.data.id).slice(-6))
                    setDtCad(moment(res.data.date_cad).format('DD/MM/YYYY'))
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
                    setNasc(moment(res.data.date_birth).format('DD/MM/YYYY'))
                } else {
                    swal("Ops ", "" + 'Cadastro Não Encontrado', "error")
                        .then(() => {
                            window.location.href = '/tutors'
                        })
                }
            }
            loadTutor(params.Id)
            
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
            const res = await tutor.deleteTutor(idCad)
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

    const handleUpdate = async () => {
        const data: any = { idCad, name, cpf, rg, nasc, sex, phone, cep, street, num, complement, district, city, state }

        const res = await tutor.updateTutor(data)
        if (res.success) {
            swal(res.message, " ", "success",)
                .then(() => {
                    window.location.href = '/tutors'
                })
        } else {
            swal("Error !", "" + JSON.stringify(res.message), "error")
        }
    }

    return (
        <div className='container--tutor-new'>
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
                        </div>
                        <div className="topBar-Btn">
                            <input type="submit" value="Salvar" className='btnSalvar' onClick={() => handleUpdate()} />
                            <Link to={'/tutors'}>
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
                                    type="text"
                                    defaultValue={nasc}
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
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}