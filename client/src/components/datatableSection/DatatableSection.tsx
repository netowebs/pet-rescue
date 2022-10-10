import { useEffect, useState } from "react"
import { PaginatedList } from "react-paginated-list"
import swal from "sweetalert"
import { sections } from "../../api/api"
import { Section } from "../../types/typeSection"
import './datatablesection.scss'
import DeleteIcon from '@mui/icons-material/Delete';

export const DatatableSection = () => {

    const [listSection, setListSection] = useState<Section[]>([])
    const [name, setName] = useState('')

    const loadList = async () => {
        let json = await sections.getAllSections()
        setListSection(json)
    }

    useEffect(() => {
        loadList()
    }, [])

    //Function Create
    const handleCreate = async () => {
        const data: any = { name }

        if (name == '') {
            alert('Digite o nome da nova seção')
        } else {
            const res = await sections.createSection(data)
            if (res.success) {
                swal(res.message, " ", "success")
                .then(()=>{
                    loadList()
                })
            } else {
                swal("Teste !", "" + JSON.stringify(res.message), "Error")
            }
        }
    }

    //Function Delete
    const handleDelete = async (idSection: number) => {
        if(idSection){
            const res = await sections.deleteSection(String(idSection))
            if(res.success){
                swal(res.message, " ", "success")
                .then(()=>{
                    loadList()
                })
            }else{
                swal("Error !", ""+JSON.stringify(res.message), "error")
            }
        } 
    }

    return (
        <div className="container--section">
            <div className="inputs--section">
                <div className="inputSection">
                    <label htmlFor="iptSection--Modal">
                        Seção
                    </label><br />
                    <input
                        className="iptSection--Modal"
                        type="text"
                        style={
                            {
                                height:'24px', 
                                width:'250px',
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
            <div className="btnInsertSection">
                <input
                    className="btnSaveSection"
                    type="button" 
                    value="Gravar Seção"
                    style={{width:'100%', height:'25px'}}
                    onClick={() => handleCreate()}
                />
            </div>
            <div className="paginatedDiv">
                <PaginatedList
                    list={listSection}
                    itemsPerPage={9}
                    renderList={(list) => (
                        <>
                            {list.map((item, index) => (
                                <div key={index} className='itemDiv--section'>
                                    <div className="itemListId--section">
                                        {item.id}
                                    </div>
                                    <div className="itemListName--section">
                                        {item.name.toUpperCase()}
                                    </div>
                                    <div className="itemBtnDel--section">
                                    <DeleteIcon 
                                            onClick={()=> handleDelete(item.id)}
                                            className='itemBtnDel--section'
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