import { useEffect, useState } from "react"
import './datatableTutors.scss'

import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PaginatedList } from "react-paginated-list";
import { Link } from "react-router-dom";
import { Tutor, tutorsDb } from "../../bdfake/tutorsDb";

type Prop = {
    search: string;
}


export const DatatableTutors = ({search}:Prop) => {

    const [loadList, setLoadList] = useState<Tutor[]>([]);

    useEffect(()=>{
        if(search !== ''){
            setLoadList(tutorsDb.filter(item => item.name.includes(search)))
        }else{
            setLoadList(tutorsDb)
        }
    },[search])


    return(
        <PaginatedList
            list={loadList}
            itemsPerPage={8}
            renderList={(list) => (
                <>  
                    <div className="titleBarTutors">
                        <div className="idTutor-title">ID</div>
                        <div className="nameTutor-title">Nome</div>
                        <div className="telTutor-title">Tel</div>
                        <div className="cpfTutor-title">CPF</div>
                    </div>
                    <div className="container">

                        {list.map((item, index)=>(
                            <div key={index} className='listPet'>
                                <div className="idTutor">{item.id}</div>
                                <div className="nameTutor">{item.name}</div>
                                <div className="telTutor">{item.tel}</div>
                                <div className="cpfTutor">{item.cpf}</div>
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