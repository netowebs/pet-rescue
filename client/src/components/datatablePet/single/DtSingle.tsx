import PrintIcon from '@mui/icons-material/Print';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pet } from '../../../api/api';
import { Pet } from '../typePet';
import './dtsingle.scss'

type Teste = {
    name: String 
}

export const DtSingle = () => {
    
    const [petDetail, setPetDetail] = useState<Pet>();
    const params = useParams()

    const [name, setName] = useState(String);

    useEffect(()=>{

    })

    const loadPetDetail = async (id: string) => {
        const res = await pet.getPet(id);
        if(res.success && res.data){
            const data = res.data
            setName(data.name)
        }
            
    }

    useEffect(()=>{
        if(params.Id){
            loadPetDetail(params.Id)
        }
    },[])

    return (
        <div className='container-single'>
            <form action="" method="post" className='formDetail'>
                <div className="topBar">
                    <div className="ipt">
                        <label htmlFor="">Código</label><br />
                        <input type="number" name='id'/>
                    </div>
                    <div className="ipt">
                        <label htmlFor="">Data de Cadastro</label><br />
                        <input type="text" name='dtCad' />
                    </div>
                </div>
                <div className="middleBar">
                    <div className="ipt">
                        <label htmlFor="">Nome</label>
                        <input type="text" 
                            name='nome' 
                            onChange={(e)=>setName(e.target.value)}
                            value={name}
                        />
                    </div>
                </div>
                <div className="bottonBar">
                    ...
                </div>
            </form>
        </div>
    )
}