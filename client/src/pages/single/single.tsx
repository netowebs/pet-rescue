import { useParams } from 'react-router-dom'
import { PetSingle } from '../../components/datatablePet/single/PetSingle'
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
                                // params.slug === 'pets' &&
                                // "Pet's" ||
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
                        <PetSingle /> ||
                        params.slug === 'tutors' &&
                        {} ||
                        params.slug === 'medical-records' &&
                        {}
                    }
                </>
            </div>
        </div>
    )
}