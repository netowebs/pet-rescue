import { useParams } from 'react-router-dom'
import { PetSingle } from '../../components/datatablePet/single/PetSingle'
import { StockSingle } from '../../components/datatableStock/single/StockSingle'
import { TutorSingle } from '../../components/datatableTutors/single/TutorSingle'
import { VetSingle } from '../../components/datatableVet/single/VetSingle'
import { NavBar } from '../../components/navbar/NavBar'
import { SideBar } from '../../components/sidebar/SideBar'
import './single.scss'

export const Single = () => {

    const params = useParams()

    return (
        <div className='single'>
            <SideBar />
            <NavBar />
            <div className="conteudo">
                <>
                    {
                        <span>
                            {
                                params.slug === 'medical-records' &&
                                "Fichas Médicas" ||
                                params.slug === `financial` &&
                                `Lançamentos Financeiros`
                            }
                        </span>
                    }
                    {
                        params.slug === 'pets' &&
                        <PetSingle /> ||
                        params.slug === 'tutor' &&
                        <TutorSingle /> ||
                        params.slug === 'medical-records' &&
                        {} ||
                        params.slug === 'vet' &&
                        <VetSingle /> ||
                        params.slug === 'stock' &&
                        <StockSingle />
                    }
                </>
            </div>
        </div>
    )
}