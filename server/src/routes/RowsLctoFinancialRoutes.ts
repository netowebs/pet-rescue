import {Router} from 'express'
import * as RowsLctoFinancialController from '../controllers/rowsLctoFinancialController'

const routerRowsLctoFinancial = Router();

routerRowsLctoFinancial.get('/rowsLctoBankFinancial/:id_bank', RowsLctoFinancialController.rowsLctoBankList)
routerRowsLctoFinancial.get('/rowsLctoFinancial/:idLcto', RowsLctoFinancialController.rowsLctoList)

export default routerRowsLctoFinancial;