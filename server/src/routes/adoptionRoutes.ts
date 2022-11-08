import {Router} from 'express'
import * as AdoptionController from '../controllers/adoptionController'

const routerAdoption = Router();

routerAdoption.get('/adoptions', AdoptionController.adoptionList)
routerAdoption.get('/adoptions/:idAdoption', AdoptionController.adoptionDetail)
// routerAdoption.put('/adoptions/update/:idUpdate', AdoptionController.petUpdate)
routerAdoption.post('/adoptions/create', AdoptionController.adoptionCreate)
routerAdoption.delete('/adoptions/del/:idDel', AdoptionController.adoptionDelete)



export default routerAdoption;