import { useEffect, useState } from "react"
import { PaginatedList } from "react-paginated-list"
import swal from "sweetalert"
import { DatatableSection } from "../datatableSection/DatatableSection"
import { Modal } from "../modal/Modal"
import './datatablebrandproduct.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import { Category } from "../../types/typeCategory"
import { brand } from "../../api/apiBrandProduct"
import { Brand } from "../../types/typeBrand"

export const DatatableBrandProduct = () => {

    const [listBrands, setListBrands] = useState<Brand[]>([])
    const [name, setName] = useState('')
    const [showModalSection, setShowModalSection] = useState(false)

    const loadList = async () => {
        let json = await brand.getAllBrands()
        setListBrands(json)
    }

    useEffect(() => {
        loadList()
        if (!showModalSection) {
            loadList()
        }
    }, [showModalSection])

    const handleCreate = async () => {
        const data: any = { name }

        if (name == '' ) {
            alert('Existem campos desmarcados')
        } else {
            const res = await brand.createBrand(data)
            if (res.success) {
                swal(res.message, " ", "success")
                    .then(() => {
                        loadList()
                    })
            } else {
                swal("Error !", "" + JSON.stringify(res.message), "error")
            }
        }

        setName('')
    }

    //Function Delete
    const handleDelete = async (idBrand: number) => {
        if (idBrand) {
            const res = await brand.deleteBrand(String(idBrand))
            if (res.success) {
                swal(res.message, " ", "success")
                    .then(() => {
                        loadList()
                    })
            } else {
                swal("Error !", "" + JSON.stringify(res.message), "error")
            }
        }
    }

    return (
        <div className="container--brand">
            <div className="inputs--brand">
                <div className="inputs">
                    <div className="boxBrand">
                        <label htmlFor="iptBrand">
                            Categoria
                        </label><br />
                        <input
                            className="iptBrand"
                            type="text"
                            //value={description}
                            style={
                                {
                                    height: '25px',
                                    width: '150px',
                                    border: '1px solid #a6a6a6',
                                    outline: 'none',
                                    textTransform: 'uppercase',
                                    padding: '5px'

                                }
                            }
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="btnInsertBrand">
                <button
                    className="btnSaveBrand"
                    onClick={() => handleCreate()}
                >
                    Gravar Marca
                </button>
            </div>
            <div className="paginatedDiv--brand">
                <PaginatedList
                    list={listBrands}
                    itemsPerPage={9}
                    renderList={(list) => (
                        <>
                            {list.map((item, index) => (
                                <div key={index} className='itemDiv--brand'>
                                    <div className="itemListId--brand">
                                        {item.id}
                                    </div>
                                    <div className="itemListName--brand">
                                        {item.name.toLocaleUpperCase()}
                                    </div>
                                    <div className="itemBtnDel--brand">
                                        <DeleteIcon
                                            onClick={() => handleDelete(item.id)}
                                            className='itemBtnDel--brand'
                                        />
                                    </div>

                                </div>
                            ))}
                        </>
                    )}
                />
            </div>

        </div>
    )
}