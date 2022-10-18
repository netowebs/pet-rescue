import React, { useEffect, useState } from "react"
import './datatableLcto.scss'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PaginatedList } from "react-paginated-list";
import { Link } from "react-router-dom";
import moment from "moment";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { sortAndToggle } from '../../sortList/SortListTutor'
import { Lcto } from "../../../types/typeLcto";
import { stockUpdate } from "../../../api/apiUpdateStock";

type Prop = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const DatatableLcto = ({ search, setSearch }: Prop) => {
    const [loadList, setLoadList] = useState<Lcto[]>([]);
    const [sort, setSort] = useState(String)
    const [toggle, setToggle] = useState(true)

    const loadLctos = async () => {
        try {
            let json = await stockUpdate.getAllUpdates();
            setLoadList(json.data);
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
        loadLctos();
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
                            className="userLcto--list-title"
                            onClick={() => handleSort("address")}
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
                        <div
                            className="dateLcto--list-title"
                            onClick={() => handleSort("description")}
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
                            className="itensLcto--list-title"
                            onClick={() => handleSort("phone")}
                        >
                            {
                                sort === 'itens' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Itens</span>
                        </div>
                        <div
                            className="qtdTotalLcto--list-title"
                            onClick={() => handleSort("cpf")}
                        >
                            {
                                sort === 'qtd' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Quantidade</span>
                        </div>
                    </div>
                    <div className="container">
                        {
                            list.filter((val) => {
                                if (search == '') {
                                    return val
                                } else if (
                                    (val.user.toLocaleLowerCase().includes(search.toLowerCase())) ||
                                    (val.user.includes(search.toLocaleLowerCase()))
                                ) {
                                    return val;
                                }
                            }).sort((a, b) => sortAndToggle(sort, a, b, toggle))
                                .map((item, index) => (
                                    <div key={index} className='listTutor'>
                                        <div className="idLcto">{("000000" + item.id).slice(-6)}</div>
                                        <div className="userLcto" >{item.user?.toUpperCase()}</div>
                                        <div className="dataLcto" >{item.date?.toString()}</div>
                                        <div className="itensLcto">{item.qtd_itens}</div>
                                        <div className="qtdTotalLcto">{item.amount}</div>
                                        <div className="btnStock">
                                            <PictureAsPdfIcon className="icon pdf" />
                                            <Link className="link" to={`/stockUpdate/${item.id}`}>
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