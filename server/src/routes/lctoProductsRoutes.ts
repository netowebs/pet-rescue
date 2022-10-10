import {Router} from 'express'
import * as LctoController from '../controllers/lctoController'

const routerLcto = Router();

routerLcto.get('/lctos', LctoController.lctoList)
routerLcto.get('/lcto/:idLcto', LctoController.lctoDetail)
routerLcto.post('/lcto/create', LctoController.lctoCreate)
routerLcto.put('/lcto/update/:idUpdate', LctoController.lctoUpdate)
routerLcto.delete('/lcto/del/:idDel', LctoController.lctoDelete)


export default routerLcto;