import {Router} from 'express'
import * as AdoptionController from '../controllers/adoptionController'

const routerAdoption = Router();

routerAdoption.get('/adoptions', AdoptionController.adoptionList)
// routerAdoption.get('/adoptions/:idPet', AdoptionController.petDetail)
// routerAdoption.put('/adoptions/update/:idUpdate', AdoptionController.petUpdate)
routerAdoption.post('/adoptions/create', AdoptionController.adoptionCreate)
// routerAdoption.delete('/adoptions/del/:idDel', AdoptionController.petDelete)



export default routerAdoption;