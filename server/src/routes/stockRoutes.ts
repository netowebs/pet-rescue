import {Router} from 'express'
import * as StockController from '../controllers/stockController'

const routerStock = Router();

routerStock.get('/products', StockController.productsList)
routerStock.get('/product/:idProduct', StockController.productDetail)
routerStock.post('/product/create', StockController.productCreate)
routerStock.put('/product/update/:idUpdate', StockController.productUpdate)
routerStock.delete('/product/del/:idDel', StockController.productDelete)


export default routerStock;