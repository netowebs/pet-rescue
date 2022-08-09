import { useEffect, useState } from "react"
import './datatableMedicalRecords.scss'

import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PaginatedList } from "react-paginated-list";
import { Link } from "react-router-dom";
import { medicalRecord, medicalRecordsDb } from "../../bdfake/medicalRecordsDb";

type Prop = {
    search: string;
}


export const DatatableMedicalRecords = ({search}:Prop) => {
    const [loadList, setLoadList] = useState<medicalRecord[]>([]);

    useEffect(()=>{
        if(search !== ''){
            setLoadList(medicalRecordsDb.filter(item => item.pet.name.includes(search)))
        }else{
            setLoadList(medicalRecordsDb)
        }
    },[search])


    return(
        <PaginatedList
            list={loadList}
            itemsPerPage={8}
            renderList={(list) => (
                <>
                    <div className="titleBar">
                        <div className="idMedicalRecord-title">ID</div>
                        <div className="statusMedicalRecord-title">Status</div>
                        <div className="vetMedicalRecord-title">Veterinário</div>
                        <div className="petMedicalRecord-title">Pet</div>
                        <div className="dtAtualMedicalRecord-title">Atualização</div>
                    </div>
                    <div className="container">
                        {list.map((item, index)=>(
                            <div key={index} className='listMedicalRecords'>
                                <div className="idMedicalRecord">{item.id}</div>
                                <div className="statusMedicalRecord">
                                    {
                                        item.status === 'saudável' &&
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
                                <div className="vetMedicalRecord">{item.vet}</div>
                                <div className="petMedicalRecord">
                                    <div className="idPetMedicalRecord">{item.pet.id}</div>
                                    <span> - </span>
                                    <div className="namePetMedicalRecord">{item.pet.name}</div>
                                </div>
                                <div className="dtAtualMedicalRecord">{item.dtAtualizacao}</div>
                                <div className="btnPet">
                                    <PictureAsPdfIcon className="icon pdf"/>
                                    <Link className="link" to={'/pets/test'}>
                                        <EditIcon className="icon edit"/>
                                    </Link>
                                    <LocalPrintshopIcon className="icon print"/>
                                </div>
                        </div>
                        ))}
                    </div>
                </>
            )}
        />
    )
}