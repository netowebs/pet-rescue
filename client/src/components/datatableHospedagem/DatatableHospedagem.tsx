import { useEffect, useState } from "react"
import { apartment, sections } from "../../api/api"
import { Apartment } from "../../types/typeApartment"
import { Section } from "../../types/typeSection"

export const DatatableHospedagem = () => {

    // const [listSection, setListSection] = useState<Section[]>([])
    const [listApartment, setListApartment] = useState<Apartment[]>([])

    const loadList = async () => {
        // let json = await sections.getAllSections()
        let json1 = await apartment.getAllApartments()
        // setListSection(json)
        setListApartment(json1)
        // console.log(json)
        console.log(json1)
    }

    useEffect(()=>{
        loadList()
    },[])

    return(
        <div className="container--section">
            {listApartment.map((item, index)=>(
                <div key={index}>
                    {item.id} - {item.name} - {item.SectionModel.name}
                </div>
            ))}
        </div>
    )
}