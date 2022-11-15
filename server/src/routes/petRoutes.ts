import {Router} from 'express'
import * as PetController from '../controllers/petController'
const routerPet = Router();

routerPet.get('/pets', PetController.petList)
routerPet.get('/pets/:idPet', PetController.petDetail)
routerPet.put('/pets/update/:idUpdate', PetController.petUpdate)
routerPet.post('/pets/create', PetController.petCreate)
routerPet.delete('/pets/del/:idDel', PetController.petDelete)

export default routerPet;