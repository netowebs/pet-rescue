import {Router} from 'express'
import * as TutorController from '../controllers/tutorController'

const routerTutors = Router();

routerTutors.get('/tutors', TutorController.tutorList)
routerTutors.get('/tutor/:idTutor', TutorController.tutorDetail)
routerTutors.post('/tutor/create', TutorController.tutorCreate)
routerTutors.put('/tutor/update/:idUpdate', TutorController.tutorUpdate)
routerTutors.delete('/tutor/del/:idDel', TutorController.tutorDelete)


export default routerTutors;