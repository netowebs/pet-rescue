import React, { useEffect, useState } from "react"
import './datatableBank.scss'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PaginatedList } from "react-paginated-list";
import { Link } from "react-router-dom";
import moment from "moment";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { sortAndToggle } from '../../sortList/SortListLcto'
import { bank } from "../../../api/apiBank";
import { Bank } from "../../../types/typeBank";

type Prop = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const DatatableBank = ({ search, setSearch }: Prop) => {
    const [loadList, setLoadList] = useState<Bank[]>([]);
    const [sort, setSort] = useState(String)
    const [toggle, setToggle] = useState(true)

    const loadBanks = async () => {
        try {
            let json = await bank.getAllBanks();
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
        loadBanks();
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
                    <div className="titleBar--ListBanks">
                        <div
                            className="idBank--list-title"
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
                            <span>Id Banco</span>
                        </div>
                        <div
                            className="nameBank--list-title"
                            onClick={() => handleSort("nf")}
                        >
                            {
                                sort === 'nf' ?
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
                            className="agencyBank--list-title"
                            onClick={() => handleSort("provider")}
                        >
                            {
                                sort === 'provider' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Agência</span>
                        </div>
                        <div
                            className="accountBank--list-title"
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
                            <span>Conta</span>
                        </div>
                        <div
                            className="balanceBank--list-title"
                            onClick={() => handleSort("amount")}
                        >
                            {
                                sort === 'amount' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Saldo</span>
                        </div>
                    </div>
                    <div className="container">
                        {
                            list.filter((val) => {
                                if (search == '') {
                                    return val
                                } else if (
                                    (val.account.toLocaleLowerCase().includes(search.toLowerCase())) ||
                                    (val.name_bank.includes(search.toLocaleLowerCase()))
                                ) {
                                    return val;
                                }
                            }).sort((a, b) => sortAndToggle(sort, a, b, toggle))
                                .map((item, index) => (
                                    <div key={index} className='listBanks'>
                                        <div className="idBank">{("000" + item.id_bank).slice(-3)}</div>
                                        <div className="nameBank" >{item.name_bank}</div>
                                        <div className="agencyBank" >{item.agency}</div>
                                        <div className="accountBank" >{item.account}</div>
                                        <div className="balanceBank">{'R$ '+item.balance.toFixed(2).replace(/['.']/, ',')}</div>
                                        <div className="btnStock">
                                            <PictureAsPdfIcon className="icon pdf" />
                                            <Link className="link" to={`/bank/${item.id}`}>
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