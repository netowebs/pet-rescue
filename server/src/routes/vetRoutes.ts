import {Router} from 'express'
import * as VetController from '../controllers/vetController'

const routerVets = Router();

routerVets.get('/vets', VetController.vetList)
routerVets.get('/vet/:idVet', VetController.vetDetail)
routerVets.post('/vet/create', VetController.vetCreate)
routerVets.put('/vet/update/:idUpdate', VetController.vetUpdate)
routerVets.delete('/vet/del/:idDel', VetController.vetDelete)


export default routerVets;