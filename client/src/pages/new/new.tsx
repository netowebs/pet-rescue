import { useParams } from 'react-router-dom'
import { AdoptionNew } from '../../components/datatableAdoptions/new/AdoptionNew'
import { BankNew } from '../../components/datatableBank/new/BankNew'
import { LctoNew } from '../../components/datatableLcto/new/LctoNew'
import { LctoNewFinancial } from '../../components/datatableLctoFinancial/new/LctoNewFinancial'
import { MedicalRecordNew } from '../../components/datatableMedicalRecords/new/MedicalRecordsNew'
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
                        params.slug === 'pets' &&
                        <PetNew /> ||
                        params.slug === 'tutors' &&
                        <TutorNew /> ||
                        params.slug === 'medical-records' &&
                        <MedicalRecordNew /> ||
                        params.slug === 'vets' &&
                        <VetNew /> ||
                        params.slug === 'stock' &&
                        <StockNew /> ||
                        params.slug === 'lctos' &&
                        <LctoNew /> ||
                        params.slug === 'bank' &&
                        <BankNew /> ||
                        params.slug === 'financial' &&
                        <LctoNewFinancial /> ||
                        params.slug === 'adoptions' &&
                        <AdoptionNew />
                    }
                </>
            </div>
        </div>
    )
}