import { ListRecords } from './listRecords/ListRecords'
import './medicalRecords.scss'

export const MedicalRecords = () => {

    return(
        <div className="container-medicalRecords">
            <div className="listCotainer">
                <div className="listTitle">
                    <span>Fichas Médicas Abertas</span>
                </div>
                <div className="listFichas">
                    <div className="title-list">
                        <div className='title-id'>ID</div>
                        <div className='title-status'>Situação</div>
                        <div className='title-vet'>Veterinário</div>
                        <div className='title-pet'>Pet</div>
                        <div className='title-dt'>Atualizacao</div>
                    </div>
                </div>
                <ListRecords />
            </div>
        </div>
    )
}