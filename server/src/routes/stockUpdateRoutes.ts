import {Router} from 'express'
import * as StockUpdateController from '../controllers/stockUpdateController'

const routerStockUpdate = Router();

routerStockUpdate.get('/stockUpdates', StockUpdateController.stockUpdateList)
routerStockUpdate.get('/stockUpdate/:idStockUpdate', StockUpdateController.stockUpdateDetail)
routerStockUpdate.post('/stockUpdate/create', StockUpdateController.updateStockCreate)


export default routerStockUpdate;