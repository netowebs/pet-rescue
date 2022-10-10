import { useEffect, useState } from "react"
import { PaginatedList } from "react-paginated-list"
import swal from "sweetalert"
import { apartment, sections } from "../../api/api"
import { Apartment } from "../../types/typeApartment"
import { Section } from "../../types/typeSection"
import { DatatableSection } from "../datatableSection/DatatableSection"
import { Modal } from "../modal/Modal"
import './datatableapartment.scss'
import DeleteIcon from '@mui/icons-material/Delete';

export const DatatableApartment = () => {

    const [listSection, setListSection] = useState<Section[]>([])
    const [listApartment, setListApartment] = useState<Apartment[]>([])
    const [name, setName] = useState('')
    const [sectionId, setSectionId] = useState('')
    const [showModalSection, setShowModalSection] = useState(false)

    const loadList = async () => {
        let json = await sections.getAllSections()
        let json1 = await apartment.getAllApartments()
        setListSection(json)
        setListApartment(json1)
    }

    useEffect(() => {
        loadList()
        if (!showModalSection) {
            loadList()
        }
    }, [showModalSection])

    const handleCreate = async () => {
        const data: any = { name, sectionId }

        if (name == '' || sectionId == null) {
            alert('Existem campos desmarcados')
        } else {
            const res = await apartment.createApartment(data)
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
        setSectionId('')
    }

    //Function Delete
    const handleDelete = async (idApartment: number) => {
        if (idApartment) {
            const res = await apartment.deleteApartment(String(idApartment))
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
        <div className="container--apartment">
            <div className="inputs--apartment">
                <div className="inputs">
                    <div className="boxApartment">
                        <label htmlFor="iptApartment">
                            Apartamento
                        </label><br />
                        <input
                            className="iptApartment"
                            type="text"
                            value={name}
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
                    <div className="boxSection">
                        <div className="inputSection">
                            <label htmlFor="selectSection--Modal">
                                Seção
                            </label><br />
                            <select
                                className="selectSection--Modal"
                                name="sectionModal"
                                defaultValue={''}
                                style={
                                    {
                                        height: '25px',
                                        width: '150px',
                                        outline: 'none',
                                    }
                                }
                                onChange={(e) => setSectionId(e.target.value.toUpperCase())}
                            >{
                                    name === '' &&
                                    <option value="">Informe o Apto...</option> ||
                                    name !== '' &&
                                    <>
                                        <option value="">Selecione...</option>
                                        {listSection.map((item, index) => (
                                            <option
                                                key={index}
                                                value={item.id}
                                            >
                                                {item.name.toUpperCase()}
                                            </option>
                                        ))}
                                    </>
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="boxBtnSection--Apartment">
                    <input
                        className="btnNewSection--Apartment"
                        type="button"
                        value="Nova Seção"
                        onClick={() => setShowModalSection(true)}
                    />
                    {
                        showModalSection === true ? <Modal
                            showModal={setShowModalSection}
                            bgColor={'none'}
                        >
                            <div className='listModal'>
                                <DatatableSection />
                            </div>
                        </Modal > : null
                    }
                </div>
            </div>
            <div className="btnInsertApartment">
                <input
                    className="btnSaveApartment"
                    type="button"
                    value="Gravar Apartmento"
                    style={{ width: '100%', height: '25px' }}
                    onClick={() => handleCreate()}
                />
            </div>
            <div className="paginatedDiv--apartment">
                <PaginatedList
                    list={listApartment}
                    itemsPerPage={9}
                    renderList={(list) => (
                        <>
                            {list.map((item, index) => (
                                <div key={index} className='itemDiv--apartment'>
                                    <div className="itemListId--apartment">
                                        {item.id}
                                    </div>
                                    <div className="itemListName--apartment">
                                        {item.name}
                                    </div>
                                    <div className="itemListSection--apartment">
                                        {item.SectionModel.name.toUpperCase()}
                                    </div>
                                    <div className="itemBtnDel--apartment">
                                        <DeleteIcon
                                            onClick={() => handleDelete(item.id)}
                                            className='itemBtnDel--apartment'
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