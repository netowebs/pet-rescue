import React, { useEffect, useState } from "react"
import './datatablePet.scss'
import { pet } from '../../../api/api'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PaginatedList } from "react-paginated-list";
import { Link } from "react-router-dom";
import moment from "moment";
import { Pet } from "../../../types/typePet";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {sortAndToggle} from '../../sortList/SortListPet'

type Prop = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const DatatablePets = ({ search, setSearch }: Prop) => {
    const [loadList, setLoadList] = useState<Pet[]>([]);
    const [sort, setSort] = useState(String)
    const [toggle, setToggle] = useState(true)

    const loadPets = async () => {
        try {
            let json = await pet.getAllPets();
            setLoadList(json);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSort = (value: string) => {
        setSort(value)
        if (toggle) {
            setToggle(false)
        } else {
            setToggle(true)
        }
    }

    useEffect(()=>{
        handleSort('id')
        setToggle(true)
    },[])

    useEffect(() => {
        loadPets();
    }, [])

    useEffect(() => {
        setSearch('')
    }, [])

    return (
        <PaginatedList
            list={loadList}
            itemsPerPage={8}
            renderList={(list) => (
                <>
                    <div className="titleBar--ListPet">
                        <div
                            className="idPet--list-title"
                            onClick={() => handleSort("id")}
                        >
                            {
                                sort === 'id' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>ID</span>
                        </div>
                        <div
                            className="namePet--list-title"
                            onClick={() => handleSort('name')}
                        >
                            {
                                sort === 'name' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Nome</span>
                        </div>
                        <div
                            className="dtRescue--list-title"
                            onClick={() => handleSort('dtRescue')}
                        >
                            {
                                sort === 'dtRescue' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                           <span>Data Resgate</span>
                        </div>
                        <div
                            className="speciePet--list-title"
                            onClick={() => handleSort('species')}
                        >
                            {
                                sort === 'species' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Espécie</span>
                        </div>
                        <div
                            className="statusPet--list-title"
                            onClick={() => handleSort('status')}
                        >
                            {
                                sort === 'status' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Adoção</span>
                        </div>
                        <div
                            className="temperamentPet--list-title"
                            onClick={() => handleSort('temperament')}
                        >
                            {
                                sort === 'temperament' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Temperamento</span>
                        </div>
                        <div
                            className="agePet--list-title"
                            onClick={() => handleSort('age')}
                        >
                            {
                                sort === 'age' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Idade Aprox</span>
                        </div>
                        <div
                            className="sexPet--list-title"
                            onClick={() => handleSort('sex')}
                        >
                            {
                                sort === 'sex' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Sexo</span>
                        </div>
                    </div>
                    <div className="container">
                        {
                            list.filter((val) => {
                                if (search == '') {
                                    return val
                                } else if (
                                    (val.name.toLocaleLowerCase().includes(search.toLowerCase())) ||
                                    (val.id.toString().includes(search)) ||
                                    (val.species.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                                ) {
                                    return val;
                                }
                            }).sort((a, b) => sortAndToggle(sort, a, b, toggle))
                                .map((item, index) => (
                                    <div key={index} className='listPet'>
                                        <div className="idPet">{("000000" + item.id).slice(-6)}</div>
                                        <div className="namePet">{item.name.toUpperCase()}</div>
                                        <div className="dtRescuePet">
                                            {
                                                moment(item.date_rescue).format('DD/MM/YYYY')
                                            }
                                        </div>
                                        <div className="speciesPet">{item.species?.toUpperCase()}</div>
                                        <div className="statusPet">{item.status}</div>
                                        <div className="temperamentPet">{item.temperament?.toUpperCase()}</div>
                                        <div className="agePet">{item.age_approx}</div>
                                        <div className="sexPet">{item.sex?.toUpperCase()}</div>
                                        <div className="btnPet">
                                            <PictureAsPdfIcon className="icon pdf" />
                                            <Link className="link" to={`/pets/${item.id}`}>
                                                <EditIcon className="icon edit" />
                                            </Link>
                                            <LocalPrintshopIcon className="icon print" />
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </>
            )}
        />
    )
}