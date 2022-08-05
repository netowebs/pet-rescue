import { useEffect, useState } from "react"
import { Pet, petsDb } from "../../bdfake/petsDb"
import './datatablePet.scss'

import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PaginatedList } from "react-paginated-list";
import { Link, useParams } from "react-router-dom";
import { Tutor, tutorsDb } from "../../bdfake/tutorsDb";

type Prop = {
    search: string;
}


export const DatatablePets = ({search}:Prop) => {
    const [loadList, setLoadList] = useState<Pet[]>([]);

    useEffect(()=>{
        if(search !== ''){
            const newList = loadList.filter(item => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
            setLoadList(newList)
        }else{
            setLoadList(petsDb)
        }
    },[search])


    return(
        <PaginatedList
            list={loadList}
            itemsPerPage={8}
            renderList={(list) => (
                <>
                    <div className="titleBar">
                        <div className="idPet-title">ID</div>
                        <div className="namePet-title">Nome</div>
                        <div className="dtCad-title">Data Cadastro</div>
                        <div className="zonePet-title">Zona</div>
                        <div className="sectionPet-title">Seção</div>
                        <div className="apartmentPet-title">Apartamento</div>
                    </div>
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