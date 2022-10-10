import {Router} from 'express'
import * as CategoriesController from '../controllers/categoriesController'

const routerCategory = Router();

routerCategory.get('/categories', CategoriesController.categoriesList)
routerCategory.get('/category/:idCategory', CategoriesController.categoryDetail)
routerCategory.post('/category/create', CategoriesController.categoryCreate)
routerCategory.put('/category/update/:idUpdate', CategoriesController.categoryUpdate)
routerCategory.delete('/category/del/:idDel', CategoriesController.categoryDelete)


export default routerCategory;