import { useEffect, useState } from "react"
import { PaginatedList } from "react-paginated-list"
import swal from "sweetalert"
import { DatatableSection } from "../datatableSection/DatatableSection"
import { Modal } from "../modal/Modal"
import './datatablecategoryproduct.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import { cat } from "../../api/apiCategoryProduct"
import { Category } from "../../types/typeCategory"

export const DatatableCategoryProduct = () => {

    const [listCategories, setListCategories] = useState<Category[]>([])
    const [description, setDescription] = useState('')
    const [showModalSection, setShowModalSection] = useState(false)

    const loadList = async () => {
        let json = await cat.getAllCategories()
        setListCategories(json)
    }

    useEffect(() => {
        loadList()
        if (!showModalSection) {
            loadList()
        }
    }, [showModalSection])

    const handleCreate = async () => {
        const data: any = { description }

        if (description == '' ) {
            alert('Existem campos desmarcados')
        } else {
            const res = await cat.createCategory(data)
            if (res.success) {
                swal(res.message, " ", "success")
                    .then(() => {
                        loadList()
                    })
            } else {
                swal("Error !", "" + JSON.stringify(res.message), "error")
            }
        }

        setDescription('')
    }

    //Function Delete
    const handleDelete = async (idCategory: number) => {
        if (idCategory) {
            const res = await cat.deleteCategory(String(idCategory))
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
        <div className="container--category">
            <div className="inputs--category">
                <div className="inputs">
                    <div className="boxCategory">
                        <label htmlFor="iptCategory">
                            Categoria
                        </label><br />
                        <input
                            className="iptCategory"
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
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="btnInsertCategory">
                <button
                    className="btnSaveCategory"
                    onClick={() => handleCreate()}
                >
                    Gravar Categoria
                </button>
            </div>
            <div className="paginatedDiv--category">
                <PaginatedList
                    list={listCategories}
                    itemsPerPage={9}
                    renderList={(list) => (
                        <>
                            {list.map((item, index) => (
                                <div key={index} className='itemDiv--category'>
                                    <div className="itemListId--category">
                                        {item.id}
                                    </div>
                                    <div className="itemListDescription--category">
                                        {item.description.toLocaleUpperCase()}
                                    </div>
                                    <div className="itemBtnDel--category">
                                        <DeleteIcon
                                            onClick={() => handleDelete(item.id)}
                                            className='itemBtnDel--category'
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