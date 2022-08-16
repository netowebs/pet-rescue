import PrintIcon from '@mui/icons-material/Print';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pet } from '../../../api/api';
import './dtsingle.scss'

export const DtSingle = () => {
    
    const params = useParams()

    const [idCad, setIdCad] = useState(Number)
    const [name, setName] = useState(String);
    const [dtRescue, setDtRescue] = useState(String);
    const [species, setSpecies] = useState(String);
    const [size, setSize] = useState(['MACHO','FEMEA'])

    const loadPetDetail = async (id: string) => {
        const res = await pet.getPet(id);
        if(res.success && res.data){
            const data = res.data
            setIdCad(data.id)
            setDtRescue(data.date_rescue)
            setName(data.name)
            setSpecies(data.species)
            setSize(data.size)
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
                    <label htmlFor="">Código</label>
                    <input type="text" defaultValue={("000000"+params.Id).slice(-6)}/>
                    <label htmlFor="">Data Resgate</label>
                    <input type="text" defaultValue={dtRescue}/>
                </div>
                <div className="middleBar">
                    <div className="ipt-label">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" 
                            name='nome' 
                            onChange={(e)=>setName(e.target.value)}
                            value={name}
                        />
                        <label htmlFor="species">Espécie</label>
                        <input type="text" 
                            name='species'
                            onChange={(e)=>setSpecies(e.target.value)}
                            value={species}
                        />
                        <label htmlFor="size">Porte</label>
                        <select name="size" id="size" defaultValue="DEFAULT">
                            <option value="DEFAULT" disabled>SELECIONE</option>
                            <option value="PEQUENO">PEQUENO</option>
                            <option value="MEDIO">MÉDIO</option>
                            <option value="GRANDE">GRANDE</option>
                        </select>
                        <label htmlFor="sexo">Sexo</label>
                        <select name="sexo" id="sexo" value={size}>
                            
                        </select>
                        <label htmlFor="age">Idade Aproximada</label>
                        <input type="number" 
                            name='age'
                        />
                        <label htmlFor="status">Adoção</label>
                        <select name="status" id="status" defaultValue="DEFAULT">
                            <option value="DEFAULT" disabled>SELECIONE</option>
                            <option value="DISPONÍVEL">DISPONÍVEL</option>
                            <option value="INDISPONÍVEL">INDISPONÍVEL</option>
                        </select>
                    </div>
                </div>
                <div className="bottonBar">
                    ...
                </div>
            </form>
        </div>
    )
}