import { useEffect, useState } from "react"
import { PaginatedList } from "react-paginated-list"
import { apartment, sections } from "../../api/api"
import { Apartment } from "../../types/typeApartment"
import { Section } from "../../types/typeSection"
import { DatatableSection } from "../datatableSection/DatatableSection"
import { Modal } from "../modal/Modal"
import './datatableapartment.scss'

export const DatatableApartment = () => {

    const [listSection, setListSection] = useState<Section[]>([])
    const [listApartment, setListApartment] = useState<Apartment[]>([])
    const [inputApt, setInputApt] = useState('')
    const [inputSection, setInputSection] = useState('')
    const [showModalSection, setShowModalSection] = useState(false)

    const loadList = async () => {
        let json = await sections.getAllSections()
        let json1 = await apartment.getAllApartments()
        setListSection(json)
        setListApartment(json1)
    }

    useEffect(() => {
        loadList()
    }, [])

    useEffect(() => {
        console.log("ModalSection: " + showModalSection)
    }, [showModalSection])

    return (
        <div className="container--section">
            <div className="inputs--section">
                <div className="inputSection">
                    <label htmlFor="iptSection--Modal">
                        Apartamento
                    </label><br />
                    <input
                        className="iptApartment--Modal"
                        type="text"
                        style={
                            {
                                height: '24px',
                                width: '150px',
                                border: '1px solid #a6a6a6',
                                outline: 'none',
                                textTransform: 'uppercase',
                                padding: '5px'

                            }
                        }
                        onChange={(e) => setInputApt(e.target.value)}
                    />
                </div>
                <div className="inputSection">
                    <label htmlFor="selectSection--Modal">
                        Seção
                    </label><br />
                    <select
                        className="selectSection--Modal"
                        name="sectionModal"
                        style={
                            {
                                height: '25px',
                                width: '150px',
                                outline: 'none',
                            }
                        }
                        onChange={(e) => setInputSection(e.target.value)}
                    >
                        {listSection.map((item, index) => (
                            <option
                                key={index}
                                value={item.id}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="inputCadSection">
                    <input
                        className="btnNewSection"
                        type="button"
                        value="Nova Seção"
                        onClick={() => setShowModalSection(true)}
                    />
                    {
                        showModalSection === true ? <Modal 
                            closeModal={setShowModalSection} 
                            bgColor={'none'}
                        >
                            <div className='listModal'>
                                <DatatableSection />
                            </div>
                        </Modal > : null
                    }

                </div>
            </div>
            <div className="btnInsert--Modal">
                <input
                    type="button"
                    value="Gravar Apartmento"
                    style={{ width: '100%', height: '25px' }}
                />
            </div>
            <div className="paginatedDiv">
                <PaginatedList
                    list={listApartment}
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
                                    <div className="itemListSection--section">
                                        {item.SectionModel.name}
                                    </div>
                                    <div className="itemBtnDel--section">
                                        <input
                                            className="btnDelItem--section"
                                            type="button"
                                            value="X"
                                            style={
                                                {
                                                    width: '18px',
                                                    color: 'red',
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