import React, { useEffect, useState } from "react"
import './datatableStock.scss'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PaginatedList } from "react-paginated-list";
import { Link } from "react-router-dom";
import moment from "moment";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { sortAndToggle } from '../../sortList/SortListStock'
import { stock } from "../../../api/apiStock";
import { Stock } from "../../../types/typeStock";

type Prop = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const DatatableStock = ({ search, setSearch }: Prop) => {
    const [loadList, setLoadList] = useState<Stock[]>([]);
    const [sort, setSort] = useState(String)
    const [toggle, setToggle] = useState(true)

    const loadProducts = async () => {
        try {
            let json = await stock.getAllProducts();
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
        loadProducts();
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
                    <div className="titleBar--ListProducts">
                        <div
                            className="idProduct--list-title"
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
                            className="skuProduct--list-title"
                            onClick={() => handleSort("sku")}
                        >
                            {
                                sort === 'sku' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Código</span>
                        </div>
                        <div
                            className="descriptionProduct--list-title"
                            onClick={() => handleSort("description")}
                        >
                            {
                                sort === 'description' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Descrição</span>
                        </div>
                        <div
                            className="validityProduct--list-title"
                            onClick={() => handleSort("validity")}
                        >
                            {
                                sort === 'validity' ?
                                    toggle &&
                                    <ArrowDownwardIcon
                                        className="downArrow"
                                    /> ||
                                    <ArrowUpwardIcon
                                        className="upArrow"
                                    />
                                    : null
                            }
                            <span>Validade</span>
                        </div>
                        <div
                            className="qtdProduct--list-title"
                            onClick={() => handleSort("qtd")}
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
                    <div className="container--stock">
                        {
                            list.filter((val) => {
                                if (search == '') {
                                    return val
                                } else if (
                                    (val.description.toLocaleLowerCase().includes(search.toLowerCase())) ||
                                    (val.sku.toLocaleLowerCase().includes(search.toLocaleLowerCase())) ||
                                    (val.id.toString().includes(search))
                                ) {
                                    return val;
                                }
                            }).sort((a, b) => sortAndToggle(sort, a, b, toggle))
                                .map((item, index) => (
                                    <div key={index} className='listProduct'>
                                        <div className="idProduct">{("000000" + item.id).slice(-6)}</div>
                                        <div className="skuProduct" >{item.sku?.toUpperCase()}</div>
                                        <div className="descriptionProduct" >{item.description?.toUpperCase().substring(0,25)}</div>
                                        <div className="validityProduct">{moment(item.validity?.toString()).format('DD/MM/YYYY')}</div>
                                        <div className="qtdProduct">{item.qtd +'-'+ item.unit}</div>
                                        <div className="btnStock">
                                            <PictureAsPdfIcon className="icon pdf" />
                                            <Link className="link" to={`/stock/${item.id}`}>
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