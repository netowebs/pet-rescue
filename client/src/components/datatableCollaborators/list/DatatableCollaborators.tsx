import React, { useEffect, useState } from "react"
import './datatableCollaborators.scss'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PaginatedList } from "react-paginated-list";
import { Link } from "react-router-dom";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { sortAndToggle } from '../../sortList/SortListCollab'
import { Collaborator } from "../../../types/typeCollaborator";
import { collab } from "../../../api/apiCollab";

type Prop = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const DatatableCollaborators = ({ search, setSearch }: Prop) => {
    const [loadList, setLoadList] = useState<Collaborator[]>([]);
    const [sort, setSort] = useState(String)
    const [toggle, setToggle] = useState(true)

    const loadCollaborators = async () => {
        try {
            let json = await collab.getAllCollab();
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
        loadCollaborators();
    }, [])

    useEffect(() => {
        setSearch('')
    }, [])

    return (
        <PaginatedList
            list={loadList.filter((val) => {
                if (search == '') {
                    return val
                } else if (
                    (val.id.toString().includes(search)) ||
                    (('000000'+val.id).slice(-6).toString().includes(search)) ||
                    (val.name.toLocaleLowerCase().includes(search.toLowerCase())) ||
                    (val.phone.toLocaleLowerCase().includes(search.toLocaleLowerCase())) ||
                    (val.cpf.toLocaleLowerCase().includes(search.toLocaleLowerCase())) ||
                    (val.rg.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                ) {
                    return val;
                }
            })}
            itemsPerPage={8}
            renderList={(list) => (
                <>
                    <div className="titleBar--ListCollab">
                        <div
                            className="idCollab--list-title"
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
                            className="nameCollab--list-title"
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
                            className="phoneCollab--list-title"
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
                            <span>Telefone</span>
                        </div>
                        <div
                            className="cpfCollab--list-title"
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
                            className="rgCollab--list-title"
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
                            list.sort((a, b) => sortAndToggle(sort, a, b, toggle))
                                .map((item, index) => (
                                    <div key={index} className='listCollab'>
                                        <div className="idCollab">{("000000" + item.id).slice(-6)}</div>
                                        <div className="nameCollab">{item.name?.toUpperCase()}</div>
                                        <div className="phoneCollab">{item.phone}</div>
                                        <div className="cpfCollab">{item.cpf}</div>
                                        <div className="rgCollab">{item.rg}</div>
                                        <div className="btnCollab">
                                            <PictureAsPdfIcon className="icon pdf" />
                                            <Link className="link" to={`/collaborators/${item.id}`}>
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