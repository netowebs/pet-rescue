import { useEffect, useState } from "react"
import './datatablePet.scss'
import {pet} from '../../../api/api'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PaginatedList } from "react-paginated-list";
import { Link } from "react-router-dom";
import moment from "moment";
import { Pet } from "../typePet";

type Prop = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const DatatablePets = ({search, setSearch}:Prop) => {
    const [loadList, setLoadList] = useState<Pet[]>([]);

    const loadPets = async () => {
        try{
            let json = await pet.getAllPets();
            setLoadList(json);
        }catch(error){
            console.log(error);
        }
        
    }

    useEffect(()=>{
        loadPets();
    },[])

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
                        <div className="dtCadRescue-title">Data Resgate</div>
                        <div className="speciePet-title">Espécie</div>
                        <div className="statusPet-title">Adoção</div>
                        <div className="temperamentPet-title">Temperamento</div>
                        <div className="agePet-title">Idade Aprox.</div>
                        <div className="sexPet-title">Sexo</div>
                        
                    </div>
                    <div className="container">
                        {
                            list.filter((val) => {
                                if(search == ''){
                                    return val
                                }else if(
                                        (val.name.toLocaleLowerCase().includes(search.toLowerCase())) || 
                                        (val.id.toString().includes(search)) ||
                                        (val.species.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                                    ){
                                    return val;
                                }
                            }).map((item, index)=>(
                                <div key={index} className='listPet'>
                                    <div className="idPet">{("000000"+item.id).slice(-6)}</div>
                                    <div className="namePet">{item.name}</div>
                                    <div className="dtRescuePet">
                                        {
                                            moment(item.date_rescue).format('DD/MM/YYYY')
                                        }
                                    </div>
                                    <div className="speciesPet">{item.species}</div>
                                    <div className="statusPet">{item.status}</div>
                                    <div className="temperamentPet">{item.temperament}</div>
                                    <div className="agePet">{item.age_approx}</div>
                                    <div className="sexPet">{item.sex}</div>
                                    <div className="btnPet">
                                        <PictureAsPdfIcon className="icon pdf"/>
                                        <Link className="link" to={`/pets/${item.id}`}>
                                            <EditIcon className="icon edit"/>
                                        </Link>
                                        <LocalPrintshopIcon className="icon print"/>
                                    </div>
                            </div>
                            ))
                        }
                    </div>
                </>
            )}
        />
    )
}