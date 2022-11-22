import React, { useEffect, useState } from "react"
import './datatableLctoFinancial.scss'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PaginatedList } from "react-paginated-list";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { sortAndToggle } from '../../sortList/SortListLctoFinancial'
import { lctoFinancial } from "../../../api/apiLctoFinancial";
import { Bank } from "../../../types/typeBank";

type Prop = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export type LctoFinancial ={
    Bank: any
    id: number,
    id_bank: string,
    date_lcto: string,
    user: string,
    totCredito: number,
    totDebito: number
    code_bank: number
    name_bank: string
}


export const DatatableLctoFinancial = ({ search, setSearch }: Prop) => {

    const params = useParams()

    const [loadList, setLoadList] = useState<LctoFinancial[]>([]);
    const [sort, setSort] = useState(String)
    const [toggle, setToggle] = useState(true)
    const [banks, setBanks] = useState<Bank[]>([])

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
        const loadLctos = async () => {
            let json = await lctoFinancial.getAllLcto();
            setLoadList(json.data);                    
        }
        loadLctos()
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
                    (val.name_bank.toLocaleLowerCase().includes(search.toLowerCase())) ||
                    (moment(val.date_lcto).format('DD/MM/YYYY').toLocaleLowerCase().includes(search.toLocaleLowerCase())) ||
                    (('000'+val.code_bank).slice(-3).toString().includes(search)) ||
                    (('000000'+val.id).slice(-6).toString().includes(search)) ||
                    (val.id.toString().includes(search)) ||
                    (val.totCredito.toFixed(2).replace(/['.']/, ',').toString().includes(search)) ||
                    (val.totDebito.toFixed(2).replace(/['.']/, ',').toString().includes(search)) ||
                    (val.user.toLocaleLowerCase().includes(search.toLowerCase()))
                ) {
                    return val;
                }
            })}
            itemsPerPage={8}
            renderList={(list) => (
                <>
                    <div className="titleBar--ListLctos">
                        <div
                            className="idLcto--list-title"
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
                            className="idBankLcto--list-title"
                            onClick={() => handleSort("code_bank")}
                        >
                            {
                                sort === 'code_bank' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Codigo Banco</span>
                        </div>
                        <div
                            className="nameBankLcto--list-title"
                            onClick={() => handleSort("name_bank")}
                        >
                            {
                                sort === 'name_bank' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Nome Banco</span>
                        </div>
                        <div
                            className="dateLcto--list-title"
                            onClick={() => handleSort("date")}
                        >
                            {
                                sort === 'date' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Data</span>
                        </div>
                        <div
                            className="totCreditoLcto--list-title"
                            onClick={() => handleSort("totCredito")}
                        >
                            {
                                sort === 'totCredito' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Total Crédito</span>
                        </div>
                        <div
                            className="totDebitoLcto--list-title"
                            onClick={() => handleSort("totDebito")}
                        >
                            {
                                sort === 'totDebito' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Total Débito</span>
                        </div>
                        <div
                            className="userLcto--list-title"
                            onClick={() => handleSort("user")}
                        >
                            {
                                sort === 'user' ?
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
                            list.sort((a, b) => sortAndToggle(sort, a, b, toggle))
                                .map((item, index) => (
                                    <div key={index} className='listLcto'>
                                        <div className="idLcto">{("000000" + item.id).slice(-6)}</div>
                                        <div className="id_bank" >{("000" + item.code_bank).slice(-3)}</div>
                                        <div className="name_bank" >{item.name_bank.toUpperCase()}</div>
                                        <div className="dateLcto" >{moment(item.date_lcto).format('DD/MM/YYYY')}</div>
                                        <div className="totCredito">{'R$ ' + item.totCredito.toFixed(2).replace(/['.']/, ',')}</div>
                                        <div className="totDebito">{'R$ ' + item.totDebito.toFixed(2).replace(/['.']/, ',')}</div>
                                        <div className="userLcto">{item.user.toUpperCase()}</div>
                                        <div className="btnStock">
                                            <PictureAsPdfIcon className="icon pdf" />
                                            <Link className="link" to={`/financial/${item.id}`}>
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