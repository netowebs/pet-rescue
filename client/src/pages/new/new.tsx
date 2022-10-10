import { useParams } from 'react-router-dom'
import { LctoNew } from '../../components/datatableLcto/new/LctoNew'
import { PetNew } from '../../components/datatablePet/new/PetNew'
import { StockNew } from '../../components/datatableStock/new/StockNew'
import { TutorNew } from '../../components/datatableTutors/new/TutorNew'
import { VetNew } from '../../components/datatableVet/new/VetNew'
import { NavBar } from '../../components/navbar/NavBar'
import { SideBar } from '../../components/sidebar/SideBar'
import './new.scss'

export const New = () => {

    const params = useParams()

    return (
        <div className='new'>
            <SideBar />
            <NavBar />
            <div className="conteudo">
                <>
                    {
                        <span>
                            {
                                params.slug === 'tutors' &&
                                "Tutores" ||
                                params.slug === 'medical-records' &&
                                "Fichas Médicas" ||
                                params.slug === `financial` &&
                                `Lançamentos Financeiros`
                            }
                        </span>
                    }
                    {
                        params.slug === 'pets' &&
                        <PetNew /> ||
                        params.slug === 'tutors' &&
                        <TutorNew /> ||
                        params.slug === 'medical-records' &&
                        {} ||
                        params.slug === 'vets' &&
                        <VetNew /> ||
                        params.slug === 'stock' &&
                        <StockNew /> ||
                        params.slug === 'lcto' &&
                        <LctoNew />
                    }
                </>
            </div>
        </div>
    )
}