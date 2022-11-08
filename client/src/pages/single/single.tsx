import { useParams } from 'react-router-dom'
import { AdoptionSingle } from '../../components/datatableAdoptions/single/AdoptionSingle'
import { BankSingle } from '../../components/datatableBank/single/BankSingle'
import { LctoSingle } from '../../components/datatableLcto/single/LctoSingle'
import { LctoSingleFinancial } from '../../components/datatableLctoFinancial/single/LctoSingleFinancial'
import { MedicalRecordSingle } from '../../components/datatableMedicalRecords/single/MedicalRecordsSingle'
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
                        params.slug === 'pets' &&
                        <PetSingle /> ||
                        params.slug === 'tutor' &&
                        <TutorSingle /> ||
                        params.slug === 'medical-records' &&
                        <MedicalRecordSingle /> ||
                        params.slug === 'vet' &&
                        <VetSingle /> ||
                        params.slug === 'stock' &&
                        <StockSingle /> ||
                        params.slug === 'stockUpdate' &&
                        <LctoSingle /> ||
                        params.slug === 'financial' &&
                        <LctoSingleFinancial /> ||
                        params.slug === 'bank' &&
                        <BankSingle /> ||
                        params.slug === 'adoptions' &&
                        <AdoptionSingle />
                    }
                </>
            </div>
        </div>
    )
}