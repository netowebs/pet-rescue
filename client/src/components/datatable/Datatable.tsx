import { useEffect, useState } from "react"
import { Pet, petsDb } from "../../bdfake/petsDb"
import './datatable.scss'

import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PaginatedList } from "react-paginated-list";

export const Datatable = () => {

    const [loadList, setLoadList] = useState<Pet[]>([])

    useEffect(()=>{
        setLoadList(petsDb)
    },[])

    return(
        <PaginatedList
            list={loadList}
            itemsPerPage={8}
            renderList={(list) => (
                <>
                    <div className="container">
                        {list.map((item, index)=>(
                            <div key={index} className='listPet'>
                                <div className="idPet">{item.id}</div>
                                <div className="namePet">{item.name}</div>
                                <div className="dtCadPet">{item.dtCad}</div>
                                <div className="zonaPet">{item.lodging.zone}</div>
                                <div className="sectionPet">{item.lodging.section}</div>
                                <div className="apartmentPet">{item.lodging.apartment}</div>
                                <div className="btnPet">
                                    <PictureAsPdfIcon className="icon pdf"/>
                                    <EditIcon className="icon edit"/>
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