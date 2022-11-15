import React, { useEffect, useState } from "react"
import './datatableMedicalRecordsDashboard.scss'
import { PaginatedList } from "react-paginated-list";
import { Link } from "react-router-dom";
import moment from "moment";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { MedicalRecord } from "../../../types/typeMedicalRecord";
import { medicalRecords } from "../../../api/apiMedicalRecords";


export const DatatableMedicalRecordsDashboard = () => {
    const [loadList, setLoadList] = useState<MedicalRecord[]>([]);
    const [sort, setSort] = useState(String)
    const [toggle, setToggle] = useState(true)

    useEffect(() => {
        const loadingList = async () => {
            try {
                let json = await medicalRecords.getAllRecords()
                if (json.data) {
                    let newArr = json.data
                    let newArrFiltered = newArr.filter((item: any) => item.statusMR !== 1)
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

    return (
        <PaginatedList
            list={loadList}
            itemsPerPage={4}
            renderList={(list) => (
                <>
                    <div className="titleBar--ListMRDashboard">
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
                            list.map((item, index) => (
                                <Link key={index} to={`/medical-records/${item.id}`} style={{textDecoration: 'none', color: 'black'}}>
                                    <div className='listMedicalRecordsDashboard'>
                                        <div className="idMR">{("000000" + item.id).slice(-6)}</div>
                                        <div className="statusMR"
                                            style={
                                                item.status === 'saudavel' ? { backgroundColor: '#16a685', color: 'white' } :
                                                    item.status === 'observacao' ? { backgroundColor: '#f0d569' } :
                                                        item.status === 'critico' ? { backgroundColor: '#ad2a2a', color: 'white' } :
                                                            { backgroundColor: 'white', color: 'black' }
                                            }
                                        >{item.status?.toUpperCase()}</div>
                                        <div className="vetMR" >{item.vet_name.split(' ').slice(0, 1).join(' ')}</div>
                                        <div className="animalMR" >{item.animal_name?.replace(/[\\"]/g, '')}</div>
                                        <div className="lastMR" >{moment(item.last_change).format('DD/MM/YYYY')}</div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </>
            )}
        />
    )
}