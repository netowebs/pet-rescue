import {Router} from 'express'
import * as LctoFinancialController from '../controllers/lctoFinancialController'

const routerLctoFinancial = Router();

routerLctoFinancial.get('/lctosFinancial', LctoFinancialController.lctoBankList)
routerLctoFinancial.get('/lctosFinancial/:idLctoFinancial', LctoFinancialController.lctoBankDetail)
routerLctoFinancial.post('/lctoFinancial/create', LctoFinancialController.lctoBankCreate)
routerLctoFinancial.put('/lctoFinancial/update/:idCad', LctoFinancialController.lctoBankUpdate)
// routerLctoFinancial.delete('/product/del/:idDel', LctoFinancialController.productDelete)


export default routerLctoFinancial;