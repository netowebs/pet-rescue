import React, { useEffect, useState } from "react"
import './datatableMedicalClosed.scss'
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
import { medicalRecords } from "../../../api/apiMedicalRecords";

type Prop = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const DatatableMedicalClosed= ({ search, setSearch }: Prop) => {
    const [loadList, setLoadList] = useState<MedicalRecord[]>([]);
    const [sort, setSort] = useState(String)
    const [toggle, setToggle] = useState(true)

    useEffect(() => {
        const loadingList = async () => {
            try {
                let json = await medicalRecords.getAllRecords()
                if (json.data) {
                    let newArr = json.data
                    let newArrFiltered = newArr.filter((item:any) => item.statusMR !==0)
                    setLoadList(newArrFiltered)
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
            list={loadList.filter((val) => {
                if (search == '') {
                    return val
                } else if (
                    (('000000'+val.id).slice(-6).toString().includes(search)) ||
                    (val.id.toString().includes(search)) ||
                    (val.vet_name.toLocaleLowerCase().includes(search.toLowerCase())) ||
                    (val.status.includes(search.toLocaleLowerCase())) ||
                    (val.animal_name.toLowerCase().includes(search.toLocaleLowerCase())) ||
                    (moment(val.last_change).format('DD/MM/YYYY').toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                ) {
                    return val;
                }
            })}
            itemsPerPage={8}
            renderList={(list) => (
                <>
                    <div className="titleBar--ListMR">
                        <div
                            className="idMR--list-title"
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
                            className="statusMR--list-title"
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
                            <span>Status</span>
                        </div>
                        <div
                            className="vetMR--list-title"
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
                            <span>Veterinário</span>
                        </div>
                        <div
                            className="petMR--list-title"
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
                            <span>Animal</span>
                        </div>
                        <div
                            className="lastChangeMR--list-title"
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
                            <span>Última Alteração</span>
                        </div>
                    </div>
                    <div className="container">
                        {
                            list.sort((a, b) => sortAndToggle(sort, a, b, toggle))
                                .map((item, index) => (
                                    <div key={index} className='listMedicalRecords'>
                                        <div className="idMR">{("000000" + item.id).slice(-6)}</div>
                                        <div className="statusMR"
                                            style={
                                                item.status === 'saudavel' ? { backgroundColor: '#16a685', color: 'white' } :
                                                item.status === 'observacao' ? { backgroundColor: '#f0d569' } :
                                                item.status === 'critico' ? { backgroundColor: '#ad2a2a', color: 'white' } :
                                                item.status === 'obito' ? { backgroundColor: '#abb8b7', color: 'white' } :
                                                { backgroundColor: 'white', color: 'black' }
                                            }
                                        >
                                            {item.status?.toUpperCase()}
                                        </div>
                                        <div className="vetMR" >{item.vet_name}</div>
                                        <div className="animalMR" >{item.animal_name.replace(/[\\"]/g, '')}</div>
                                        <div className="lastMR" >{moment(item.last_change).format('DD/MM/YYYY')}</div>
                                        <div className="btnStock">
                                            <PictureAsPdfIcon className="icon pdf" />
                                            <Link className="link" to={`/medical-records/${item.id}`}>
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