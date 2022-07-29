import { BoxWidgets } from './boxTop/BoxWidgets'
import { MedicalRecords } from './boxFooter/medicalRecords/MedicalRecords';
import { Calendar } from './boxFooter/calendar/Calendar';
import './widgets.scss'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { BoxLogo } from './boxLogo/BoxLogo';


export const Widgets = () => {
    return(
        <div className='widgets'>
            <div className="top">
                <BoxWidgets
                    style={{
                        bgColor:'#278dd6',
                        bgBottom:'#106bad'
                    }}
                    top={{
                        numInfo:895.60,
                        txtInfo: 'Saldo Total',
                        bgImg: <AttachMoneyIcon 
                            sx={{fontSize: 65}}                            
                        />
                    }}
                    bottom={{
                        txtLink: 'Financeiro'
                    }}
                />
                <BoxWidgets
                    style={{
                        bgColor:'#ed5f5f',
                        bgBottom:'#ad2a2a'
                    }}
                    top={{
                        numInfo:13,
                        txtInfo: 'Itens com estoque baixo',
                        bgImg: <InventoryIcon 
                            sx={{fontSize: 65}}
                        />
                    }}
                    bottom={{
                        txtLink: 'Estoque'
                    }}
                />
                <BoxWidgets 
                    style={{
                        bgColor:'#3ae0ba',
                        bgBottom:'#16a685'
                    }}
                    top={{
                        numInfo:13,
                        txtInfo: `Pet's disponíveis`,
                        bgImg: <VolunteerActivismIcon 
                            sx={{fontSize: 65}}
                        />
                    }}
                    bottom={{
                        txtLink: 'Listagem'
                    }}
                />
                <BoxWidgets 
                    style={{
                        bgColor:'#f0d569',
                        bgBottom:'#b89b2a'
                    }}
                    top={{
                        numInfo:113,
                        txtInfo: `Pet's adotados`,
                        bgImg: <FavoriteIcon 
                            sx={{fontSize: 65}}
                        />
                    }}
                    bottom={{
                        txtLink: 'Relatório'
                    }}
                />
            </div>
            <div className="center">
                    <BoxLogo />
            </div>
            <div className="bottom">
                <div className="calendar">
                    <Calendar />
                </div>
                <div className="medicalRecords">
                    <MedicalRecords />
                </div>
            </div>
        </div>
    )
}