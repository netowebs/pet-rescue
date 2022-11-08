import {Router} from 'express'
import * as MedicalRecordController from '../controllers/medicalRecordsController'

const routerMedicalRecords = Router();

routerMedicalRecords.get('/medicalRecords', MedicalRecordController.medicalRecordsList)
routerMedicalRecords.get('/medicalRecords/:idMedicalRecord', MedicalRecordController.medicalRecordDetail)
routerMedicalRecords.post('/medicalRecords/create', MedicalRecordController.medicalRecordCreate)
routerMedicalRecords.put('/medicalRecords/update/:idMedicalRecord', MedicalRecordController.medicalRecordUpdate)
// routerMedicalRecords.delete('/product/del/:idDel', MedicalRecordController.productDelete)


export default routerMedicalRecords;