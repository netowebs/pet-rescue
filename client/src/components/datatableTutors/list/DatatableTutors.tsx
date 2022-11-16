import React, { useEffect, useState } from "react"
import './datatableTutors.scss'
import { tutor } from '../../../api/apiTutors'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PaginatedList } from "react-paginated-list";
import { Link } from "react-router-dom";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { sortAndToggle } from '../../sortList/SortListTutor'
import { Tutor } from "../../../types/typeTutor";

type Prop = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const DatatableTutors = ({ search, setSearch }: Prop) => {
    const [loadList, setLoadList] = useState<Tutor[]>([]);
    const [sort, setSort] = useState(String)
    const [toggle, setToggle] = useState(true)

    const loadTutors = async () => {
        try {
            let json = await tutor.getAllTutors();
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

    useEffect(() => {
        handleSort('id')
        setToggle(true)
    }, [])

    useEffect(() => {
        loadTutors();
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
                    <div className="titleBar--ListTutor">
                        <div
                            className="idTutor--list-title"
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
                            className="nameTutor--list-title"
                            onClick={() => handleSort("name")}
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
                            className="addressTutor--list-title"
                            onClick={() => handleSort("address")}
                        >
                            {
                                sort === 'address' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Endereço</span>
                        </div>
                        <div
                            className="phoneTutor--list-title"
                            onClick={() => handleSort("phone")}
                        >
                            {
                                sort === 'phone' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Phone</span>
                        </div>
                        <div
                            className="cpfTutor--list-title"
                            onClick={() => handleSort("cpf")}
                        >
                            {
                                sort === 'cpf' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>CPF</span>
                        </div>
                        <div
                            className="rgTutor--list-title"
                            onClick={() => handleSort("rg")}
                        >
                            {
                                sort === 'rg' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>RG</span>
                        </div>
                    </div>
                    <div className="container">
                        {
                            list.filter((val) => {
                                if (search == '') {
                                    return val
                                } else if (
                                    (val.name.toLocaleLowerCase().includes(search.toLowerCase())) ||
                                    (val.phone.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                                ) {
                                    return val;
                                }
                            }).sort((a, b) => sortAndToggle(sort, a, b, toggle))
                                .map((item, index) => (
                                    <div key={index} className='listTutor'>
                                        <div className="idTutor">{("000000" + item.id).slice(-6)}</div>
                                        <div className="nameTutor">{item.name.toUpperCase()}</div>
                                        <div className="addressTutor">{item.address.toUpperCase()}</div>
                                        <div className="phoneTutor">{item.phone.toLocaleUpperCase()}</div>
                                        <div className="cpfTutor">{item.cpf}</div>
                                        <div className="rgTutor">{item.rg}</div>
                                        <div className="btnTutor">
                                            <PictureAsPdfIcon className="icon pdf" />
                                            <Link className="link" to={`/tutor/${item.id}`}>
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