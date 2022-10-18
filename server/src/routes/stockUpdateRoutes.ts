import {Router} from 'express'
import * as StockUpdateController from '../controllers/stockUpdateController'

const routerStockUpdate = Router();

routerStockUpdate.get('/stockUpdates', StockUpdateController.stockUpdateList)
routerStockUpdate.get('/stockUpdate/:idStockUpdate', StockUpdateController.stockUpdateDetail)
// routerStockUpdate.get('/productSku/:skuProduct', StockUpdateController.productDetailSku)
routerStockUpdate.post('/stockUpdate/create', StockUpdateController.updateStockCreate)
// routerStockUpdate.put('/product/update/:idUpdate', StockUpdateController.productUpdate)
// routerStockUpdate.delete('/product/del/:idDel', StockUpdateController.productDelete)


export default routerStockUpdate;