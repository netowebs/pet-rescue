import moment from 'moment';
import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import './feeddatatable.scss'
import swal from 'sweetalert'
import { pet } from '../../api/api';
import { AuthContext } from '../../contexts/Auth/AuthContex';
import { Pet } from '../../types/typePet';
import { PaginatedList } from 'react-paginated-list';
import { feed } from '../../api/apiFeed';


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

export type PetFeed = {
    petId: number
    petName: string
    petQtdFood: number
    petStatus: string
    stockId: number
    stockSku: string
    stockDescription: string
}

export const Feed = () => {

    const params = useParams()

    const auth = useContext(AuthContext)

    //Dados do lançamento
    const [dtCad, setDtCad] = useState(String)
    const [user, setUser] = useState(auth.user?.username)

    const [listPets, setListPets] = useState<PetFeed[]>([])
    const [pets, setPets] = useState<Pet[]>([])

    //Get Animal
    useEffect(() => {
        const getAnimal = async () => {
            let json = await pet.getAllPets()
            if (json) {
                setPets(json)
            }
            handleListPets(pets)
        }
        getAnimal()
    }, [pets.length])

    const handleListPets = (list: any) => {
        let newArr = [...listPets]
        if (list) {
            list.filter((it: any) => it.obito === 'NAO').filter((it: any) => it.adoption_id === null).filter((it: any) => moment(it.lastFeed).format('DD/MM/YYYY') !== moment().format('DD/MM/YYYY')).forEach((item: any, index: number) => {
                newArr = ([...newArr, { petId: item.id, petName: item.name, petQtdFood: item.qtd_food, stockId: item.stockModel?.id, stockSku: item.stockModel?.sku, stockDescription: item.stockModel?.description, petStatus: item.status }])
                setListPets(newArr)
            })
        }

    }



    useEffect(() => {
        setDtCad(moment().format('DD/MM/YYYY'))
    }, [])

    const handleCreate = async () => {

        const data: any = { user, dtCad, listPets }
        const res = await feed.createFeed(data)
        if (res.success) {
            swal(res.message, " ", "success")
                .then(() => {
                    //window.location.href = '/home'
                })
        } else {
            swal("Error !", "" + JSON.stringify(res.message), "error")

        }
    }


    return (
        <div className='container--medicalRecord-single'>
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
                                    defaultValue={auth.user?.username}
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
                            {
                                listPets.length > 0 &&
                                <>
                                    <input type="submit" value="Alimentar" className='btnSalvar' onClick={() => handleCreate()} />
                                    <Link to={`/home`}>
                                        <input type="button" value="Cancelar" className='btnCancelar' />
                                    </Link>
                                </> ||
                                <Link to={`/home`}>
                                    <input type="button" value="Cancelar" className='btnCancelar' />
                                </Link>
                            }

                        </div>
                    </div>
                </div>
                <fieldset className='middleFieldset'>
                    <legend>
                        .::Lista de animais disponíveis para alimentar::.
                    </legend>
                    <div className="middleBarFeed">
                        <div className="middleBar-internoFeed">
                            {
                                listPets.length > 0 &&
                                <PaginatedList
                                    list={listPets}
                                    itemsPerPage={10}
                                    renderList={(list) => (
                                        <>
                                            <div className="titleBar--listPets">
                                                <div
                                                    className="titleIdAnimal"
                                                >
                                                    <span>ID Animal</span>
                                                </div>
                                                <div
                                                    className="titleNamePet"
                                                >
                                                    <span>Nome Animal</span>
                                                </div>
                                                <div
                                                    className="titleQtdFood"
                                                >
                                                    <span>Quantide Ração</span>
                                                </div>
                                                <div
                                                    className="titleStockId"
                                                >
                                                    <span>Id Produto</span>
                                                </div>
                                                <div
                                                    className="titleStockSku"
                                                >
                                                    <span>SKU Produto</span>
                                                </div>
                                                <div
                                                    className="titleStockDescription"
                                                >
                                                    <span>Descrição</span>
                                                </div>
                                            </div>
                                            <div className="containerListPets">
                                                {
                                                    listPets.map((item, index) => (
                                                        <div key={index} className='listPets'>
                                                            <div className="petID">{("000000" + item.petId).slice(-6)}</div>
                                                            <div className="petName" >{item.petName.toUpperCase()}</div>
                                                            <div className="petQtdFood" >{
                                                                <>
                                                                    <input
                                                                        type="text"
                                                                        defaultValue={item.petQtdFood}
                                                                        style={
                                                                            {
                                                                                width: '50px',
                                                                                border: 'none',
                                                                                outline: 'none',
                                                                                backgroundColor: '#3ae0ba',
                                                                                color: 'white',
                                                                                textAlign: 'center',
                                                                                borderRadius: '3px'
                                                                            }
                                                                        }
                                                                    />
                                                                    <span>g.</span>
                                                                </>
                                                            }</div>
                                                            <div className="stockId" >{("000000" + item.stockId).slice(-6)}</div>
                                                            <div className="stockSku">{item.stockSku.toUpperCase()}</div>
                                                            <div className="stockDescription">{item.stockDescription.toUpperCase()}</div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </>
                                    )}
                                /> ||
                                <div
                                    className="message"
                                    style={{
                                        width: '100%',
                                        marginBottom: '80px'
                                    }}
                                >
                                    <span
                                        className='listAnimalsClear'
                                        style={{
                                            display: 'flex',
                                            marginTop: '200px',
                                            fontSize: '30px',
                                            fontFamily: 'arial',
                                            justifyContent: 'center',
                                            color: '#16a685'

                                        }}
                                    >
                                        ANIMAIS ALIMENTADOS HOJE
                                    </span>
                                </div>
                            }
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}