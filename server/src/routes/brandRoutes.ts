import {Router} from 'express'
import * as BrandsController from '../controllers/brandsController'

const routerBrand = Router();

routerBrand.get('/brands', BrandsController.brandsList)
routerBrand.get('/brand/:idBrand', BrandsController.brandDetail)
routerBrand.post('/brand/create', BrandsController.brandCreate)
routerBrand.put('/brand/update/:idUpdate', BrandsController.brandUpdate)
routerBrand.delete('/brand/del/:idDel', BrandsController.brandDelete)


export default routerBrand;