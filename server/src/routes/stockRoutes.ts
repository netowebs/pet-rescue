import {Router} from 'express'
import * as StockController from '../controllers/stockController'

const routerStock = Router();

routerStock.get('/products', StockController.productsList)
routerStock.get('/product/:idProduct', StockController.productDetail)
routerStock.get('/productSku/:skuProduct', StockController.productDetailSku)
routerStock.post('/product/create', StockController.productCreate)
routerStock.put('/product/update/:idUpdate', StockController.productUpdate)
routerStock.put('/product/updateLcto/:idUpdate', StockController.productUpdateLcto)
routerStock.delete('/product/del/:idDel', StockController.productDelete)


export default routerStock;