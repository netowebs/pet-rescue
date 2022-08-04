import { useEffect, useState } from "react"
import { medicalRecord, medicalRecordsDb } from "../../../../../bdfake/medicalRecordsDb"
import './listrecords.scss'

export const ListRecords = () => {

    const [loadList, setLoadList] = useState<medicalRecord[]>([])

    useEffect(()=>{
        setLoadList(medicalRecordsDb)
    },[])

    return(
        <div className="container">
            {loadList.map((item,index)=>(
                <div key={index} className="list-fichas">
                    <div className="item-id">{item.id}</div>
                    <div className="item-status">
                        {item.status === 'saudável' &&
                            <div style={{backgroundColor:'#16a685', borderRadius: '5px'}}>
                                {item.status}
                            </div> ||
                            item.status === 'crítico' &&
                                <div style={{backgroundColor: '#ad2a2a', borderRadius: '5px'}}>
                                    {item.status}
                                </div> ||
                                item.status === 'observação' &&
                                <div style={{backgroundColor: '#f0d569', borderRadius: '5px'}}>
                                    {item.status}
                                </div>
                        }
                    </div>
                    <div className="item-vet">{item.vet}</div>
                    <div className="item-pet">
                        <div className="pet-id">{item.pet.id}</div>
                        <div className="pet-name">{item.pet.name}</div>
                    </div>
                    <div className="item-dtAtualizacao">{item.dtAtualizacao}</div>
                </div>
            ))}
        </div>
    )
}