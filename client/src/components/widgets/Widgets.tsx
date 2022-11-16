import { BoxWidgets } from './boxTop/BoxWidgets'
import { MedicalRecords } from './boxFooter/medicalRecords/MedicalRecords'
import './widgets.scss'
import {useState, useEffect} from 'react'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { BoxLogo } from './boxLogo/BoxLogo';
import { bank } from '../../api/apiBank';
import { pet } from '../../api/api';
import { stock } from '../../api/apiStock';
import { Chart } from './boxFooter/chart/Chart';

export const Widgets = () => {

    const [saldo, setSaldo] = useState(Number)
    const [lowStock, setLowStock] = useState(Number)
    const [petsAvailable, setPetsAvailable] = useState(Number)
    const [petAdopted, setPetAdopted] = useState(Number)

    const getLowStock = async () => {
        let newArr = []
        let json = await stock.getAllProducts()
        if(json){
            newArr = json.filter((item: { lowStock: number; }) => item.lowStock === 1)
        }

        setLowStock(newArr.length)
    }

    const getSaldo = async () => {
        let totCreditos = 0
        let totDebitos = 0
        let json = await bank.getAllBanks()
        if(json){
            let newArr = json
            newArr.map((item: any) => {
                totCreditos = totCreditos + item.tot_creditos
                totDebitos = totDebitos + item.tot_debitos
            })
        }
        setSaldo(totCreditos - totDebitos)
    }

    const getPets = async () => {
        let newArrAdopted = []
        let newArrAvailable = []
        let json = await pet.getAllPets()
        if(json){
            newArrAdopted = json.filter((item: { adoption_id: null; }) => item.adoption_id !== null)
            newArrAvailable = json.filter((item: { status: string; }) => item.status === 'DISPONIVEL')
        }
        setPetAdopted(newArrAdopted.length)
        setPetsAvailable(newArrAvailable.length)
    }

    useEffect(() => {
        getSaldo()
        getPets()
        getLowStock()
    },[])


    return(
        <div className='widgets'>
            <div className="top">
                <BoxWidgets
                    style={{
                        bgColor:'#278dd6',
                        bgBottom:'#106bad'
                    }}
                    top={{
                        numInfo: `${saldo.toLocaleString('pt-br', {minimumFractionDigits: 2})}`,
                        txtInfo: 'Saldo Total',
                        bgImg: <AttachMoneyIcon 
                            sx={{fontSize: 65}}                            
                        />
                    }}
                    bottom={{
                        txt: 'Financeiro',
                        link: '/financial'

                    }}
                />
                <BoxWidgets
                    style={{
                        bgColor:'#ed5f5f',
                        bgBottom:'#ad2a2a'
                    }}
                    top={{
                        numInfo:`${lowStock}`,
                        txtInfo: 'Itens com estoque baixo',
                        bgImg: <InventoryIcon 
                            sx={{fontSize: 65}}
                        />
                    }}
                    bottom={{
                        txt: 'Estoque',
                        link: '/stock'
                    }}
                />
                <BoxWidgets 
                    style={{
                        bgColor:'#3ae0ba',
                        bgBottom:'#16a685'
                    }}
                    top={{
                        numInfo:`${petsAvailable}`,
                        txtInfo: `Pet's disponíveis`,
                        bgImg: <VolunteerActivismIcon 
                            sx={{fontSize: 65}}
                        />
                    }}
                    bottom={{
                        txt: 'Listagem',
                        link: '/pets'
                    }}
                />
                <BoxWidgets 
                    style={{
                        bgColor:'#f0d569',
                        bgBottom:'#b89b2a'
                    }}
                    top={{
                        numInfo:`${petAdopted}`,
                        txtInfo: `Pet's adotados`,
                        bgImg: <FavoriteIcon 
                            sx={{fontSize: 65}}
                        />
                    }}
                    bottom={{
                        txt: 'Listagem',
                        link: '/adopted'
                    }}
                />
            </div>
            <div className="center">
                    <BoxLogo />
            </div>
            <div className="bottom">
                <div className="chart">
                    <Chart />
                </div>
                <div className="medicalRecords">
                    <MedicalRecords />
                </div>
            </div>
        </div>
    )
}