import PrintIcon from '@mui/icons-material/Print';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pet } from '../../../api/api';
import { Pet } from '../typePet';
import './dtsingle.scss'

export const DtSingle = () => {
    
    const [petDetail, setPetDetail] = useState<Pet>();
    const params = useParams()

    const loadPetDetail = async (id: string) => {
        try{
            let response = await pet.getPet(id);
            setPetDetail(response);
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        if(params.Id){
            loadPetDetail(params.Id)
        }
    },[])

    return (
        <div className='container-single'>
            <div className="topBar-single">
                <div className="inputs">
                    <div className="ipt-id">
                        <label htmlFor="ipt-codigo">Código</label><br />
                        <input type="text" className='ipt-codigo' value={petDetail?.id}/>
                    </div>
                    <div className="ipt-dt">
                        <label htmlFor="ipt-dt">Data Cadastro</label><br />
                        <input type="text" className='ipt-dt' value={
                            moment(petDetail?.date_rescue).format('DD/MM/YYYY')
                        }/>
                    </div>
                </div>
                <div className="printBtn">
                    <PrintIcon sx={{
                        backgroundColor: "#02c4e3",
                        width: "80px",
                        height: "45px",
                        color: "white",
                        cursor: "pointer",
                        borderRadius: "10px",
                        "&:hover":{
                            backgroundColor: "#75daeb"
                        }                    
                    }}/>
                </div>
                <div className="btnCommands">
                    <input className='btn save' type="button" value="Salvar" />
                    <input className='btn cancel' type="button" value="Cancelar" />
                    <input className='btn del' type="button" value="Excluir"/>
                </div>
            </div>
            <div className="middleBar-single">
                Conteudo Bar
            </div>
        </div>
    )
}