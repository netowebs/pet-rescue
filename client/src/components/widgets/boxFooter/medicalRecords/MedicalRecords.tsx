import { DatatableMedicalRecordsDashboard } from '../../../datatableMedicalRecords/listDashboard/DatatableMedicalRecordsDashboard'
import './medicalRecords.scss'

export const MedicalRecords = () => {

    return(
        <div className="container-medicalRecords">
            <div className="listCotainer">
                <div className="listTitle">
                    <span>Fichas Médicas Abertas</span>
                </div>
                <DatatableMedicalRecordsDashboard />
            </div>
        </div>
    )
}