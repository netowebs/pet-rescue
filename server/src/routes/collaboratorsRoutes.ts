import {Router} from 'express'
import * as CollabController from '../controllers/collaboratorsController'

const routerCollab = Router();

routerCollab.get('/collabs', CollabController.collabList)
routerCollab.get('/collab/:idCollab', CollabController.collabDetail)
routerCollab.post('/collab/create', CollabController.collabCreate)
routerCollab.put('/collab/update/:idUpdate', CollabController.collabUpdate)
routerCollab.delete('/collab/del/:idDel', CollabController.collabDelete)


export default routerCollab;