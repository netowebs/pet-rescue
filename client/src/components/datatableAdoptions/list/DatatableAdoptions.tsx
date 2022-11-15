import React, { useEffect, useState } from "react"
import './datatableAdoptions.scss'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PaginatedList } from "react-paginated-list";
import { Link } from "react-router-dom";
import moment from "moment";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { sortAndToggle } from '../../sortList/SortListMedicalRecord'
import { MedicalRecord } from "../../../types/typeMedicalRecord";
import { adoption } from "../../../api/apiAdoption";
import { Adoption } from "../../../types/typeAdoption";

type Prop = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const DatatableAdoptions = ({ search, setSearch }: Prop) => {
    const [loadList, setLoadList] = useState<Adoption[]>([]);
    const [sort, setSort] = useState(String)
    const [toggle, setToggle] = useState(true)

    useEffect(() => {
        const loadingList = async () => {
            try {
                let json = await adoption.getAllAdoption()
                if (json) {
                    setLoadList(json)
                }
            } catch (error) {
                console.log(error);
            }
        }
        loadingList()
    }, [])

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
        setSearch('')
    }, [])

    return (
        <PaginatedList
            list={loadList}
            itemsPerPage={8}
            renderList={(list) => (
                <>
                    <div className="titleBar--ListAdoption">
                        <div
                            className="idAdoption--list-title"
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
                            className="petAdoption--list-title"
                            onClick={() => handleSort("status")}
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
                            <span>Animal</span>
                        </div>
                        <div
                            className="tutorAdoption--list-title"
                            onClick={() => handleSort("vet")}
                        >
                            {
                                sort === 'vet' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Tutor</span>
                        </div>
                        <div
                            className="dateAdoption--list-title"
                            onClick={() => handleSort("pet")}
                        >
                            {
                                sort === 'pet' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Data Adoção</span>
                        </div>
                        <div
                            className="userAdoption--list-title"
                            onClick={() => handleSort("last")}
                        >
                            {
                                sort === 'last' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Usuário</span>
                        </div>
                    </div>
                    <div className="container">
                        {
                            list.filter((val) => {
                                if (search == '') {
                                    return val
                                } else if (
                                    (val.AnimalModel.name.includes(search.toLocaleLowerCase())) ||
                                    (val.TutorModel.name.includes(search.toLocaleLowerCase()))
                                ) {
                                    return val;
                                }
                            }).sort((a, b) => sortAndToggle(sort, a, b, toggle))
                                .map((item, index) => (
                                    <div key={index} className='listMedicalRecords'>
                                        <div className="idAdoption">{("000000" + item.id).slice(-6)}</div>
                                        <div className="petAdoption" >{item.AnimalModel.name.toUpperCase()}</div>
                                        <div className="tutorAdoption" >{item.TutorModel.name.toUpperCase()}</div>
                                        <div className="dateAdoption" >{moment(item.date).format('DD/MM/YYYY')}</div>
                                        <div className="userAdoption" >{item.user.toUpperCase()}</div>
                                        <div className="btnStock">
                                            <PictureAsPdfIcon className="icon pdf" />
                                            <Link className="link" to={`/adoptions/${item.id}`}>
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