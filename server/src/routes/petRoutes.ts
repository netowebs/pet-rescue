import {Router} from 'express'
import * as PetController from '../controllers/petController'

const routerPet = Router();

routerPet.get('/pets', PetController.petList)
routerPet.get('/pets/:idPet', PetController.petDetail)



export default routerPet;