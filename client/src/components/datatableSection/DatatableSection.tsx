import { useEffect, useState } from "react"
import { PaginatedList } from "react-paginated-list"
import { sections } from "../../api/api"
import { Section } from "../../types/typeSection"
import './datatablesection.scss'

export const DatatableSection = () => {

    const [listSection, setListSection] = useState<Section[]>([])
    const [inputSect, setInputSect] = useState('')

    const loadList = async () => {
        let json = await sections.getAllSections()
        setListSection(json)
    }

    useEffect(() => {
        loadList()
    }, [])

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
                        onChange={(e) => setInputSect(e.target.value)}
                    />
                </div>
            </div>
            <div className="btnInsert--Modal">
                <input 
                    type="button" 
                    value="Gravar Seção"
                    style={{width:'100%', height:'25px'}}
                />
            </div>
            <div className="paginatedDiv">
                <PaginatedList
                    list={listSection}
                    itemsPerPage={10}
                    renderList={(list) => (
                        <>
                            {list.map((item, index) => (
                                <div key={index} className='itemDiv'>
                                    <div className="itemListId--section">
                                        {item.id}
                                    </div>
                                    <div className="itemListName--section">
                                        {item.name}
                                    </div>
                                    <div className="itemBtnDel--section">
                                        <input
                                            className="btnDelItem--section"
                                            type="button"
                                            value="X"
                                            style={
                                                {
                                                    width:'18px', 
                                                    color:'red',
                                                    fontSize: '18px',
                                                    fontWeight: 'bold',
                                                    backgroundColor: 'transparent'
                                                }
                                            }
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