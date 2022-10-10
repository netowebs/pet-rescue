import React, { useEffect, useState } from "react"
import './datatableVet.scss'
import { vet } from '../../../api/apiVet'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PaginatedList } from "react-paginated-list";
import { Link } from "react-router-dom";
import moment from "moment";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { sortAndToggle } from '../../sortList/SortListVet'
import { Vet } from "../../../types/typeVet";

type Prop = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const DatatableVets = ({ search, setSearch }: Prop) => {
    const [loadList, setLoadList] = useState<Vet[]>([]);
    const [sort, setSort] = useState(String)
    const [toggle, setToggle] = useState(true)

    const loadVets = async () => {
        try {
            let json = await vet.getAllVets();
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
        loadVets();
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
                    <div className="titleBar--ListVet">
                        <div
                            className="idVet--list-title"
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
                            className="crmvVet--list-title"
                            onClick={() => handleSort("crmv")}
                        >
                            {
                                sort === 'crmv' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>CRMV</span>
                        </div>
                        <div
                            className="nameVet--list-title"
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
                            className="specialityVet--list-title"
                            onClick={() => handleSort('speciality')}
                        >
                            {
                                sort === 'speciality' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Especialidade</span>
                        </div>
                        <div
                            className="addressVet--list-title"
                            onClick={() => handleSort('address')}
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
                            className="phoneVet--list-title"
                            onClick={() => handleSort('phone')}
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

                    </div>
                    <div className="container">
                        {
                            list.filter((val) => {
                                if (search == '') {
                                    return val
                                } else if (
                                    (val.name.toLocaleLowerCase().includes(search.toLowerCase())) ||
                                    (val.crmv.toLocaleLowerCase().includes(search.toLocaleLowerCase())) ||
                                    (val.speciality.toLocaleLowerCase().includes(search.toLocaleLowerCase())) ||
                                    (val.phone.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                                ) {
                                    return val;
                                }
                            }).sort((a, b) => sortAndToggle(sort, a, b, toggle))
                                .map((item, index) => (
                                    <div key={index} className='listVet'>
                                        <div className="idVet">{("000000" + item.id).slice(-6)}</div>
                                        <div className="crmvVet">{item.crmv.toUpperCase()}</div>
                                        <div className="nameVet">{item.name.toUpperCase()}</div>
                                        <div className="specialityVet">{item.speciality?.toUpperCase()}</div>
                                        <div className="addressVet">{item.address.toUpperCase()}</div>
                                        <div className="phoneVet">{item.phone}</div>
                                        <div className="btnPet">
                                            <PictureAsPdfIcon className="icon pdf" />
                                            <Link className="link" to={`/vet/${item.id}`}>
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