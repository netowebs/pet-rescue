import { useEffect, useState } from "react"
// import { Pet, petsDb } from "../../bdfake/petsDb"
import './datatablePet.scss'
import {pet} from '../../api/api'
import Moment, { MomentLongDateFormat } from 'moment'

import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PaginatedList } from "react-paginated-list";
import { Link } from "react-router-dom";

type Prop = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

type Pet  = {
    id: number,
    adoptions_id: number,
    name: string,
    species: string,
    date_rescue: any,
    status: string,
    sex: string,
    age_approx: number
}

export const DatatablePets = ({search, setSearch}:Prop) => {
    const [loadList, setLoadList] = useState<Pet[]>([]);

    const loadPets = async () => {
        let json = await pet.getAllPets();
        setLoadList(json);
    }

    useEffect(()=>{
        loadPets();
    },[])

    useEffect(()=>{
        if(search !== ''){
            setLoadList(loadList.filter(item => item.name.includes(search) || item.species.includes(search) || item.date_rescue.toString().includes(search) || item.status.includes(search) || item.id.toString().includes(search)))
        }else{
            setLoadList(loadList)
        }
    },[search])

    useEffect(()=>{
        setSearch('')
    },[])


    return(
        <PaginatedList
            list={loadList}
            itemsPerPage={8}
            renderList={(list) => (
                <>
                    <div className="titleBar">
                        <div className="idPet-title">ID</div>
                        <div className="namePet-title">Nome</div>
                        <div className="dtCad-title">Data Resgate</div>
                        <div className="zonePet-title">Espécie</div>
                        <div className="sectionPet-title">Adoção</div>
                        <div className="apartmentPet-title">Sexo</div>
                    </div>
                    <div className="container">
                        {list.map((item, index)=>(
                            <div key={index} className='listPet'>
                                <div className="idPet">{item.id}</div>
                                <div className="namePet">{item.name}</div>
                                <div className="dtCadPet">
                                    {
                                        item.date_rescue
                                    }
                                </div>
                                <div className="zonaPet">{item.species}</div>
                                <div className="sectionPet">{item.status}</div>
                                <div className="apartmentPet">{item.sex}</div>
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