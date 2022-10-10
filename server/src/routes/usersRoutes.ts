import {Router} from 'express'
import * as UsersController from '../controllers/usersController'

const routerUsers = Router();

routerUsers.get('/users', UsersController.usersList)
routerUsers.get('/user/:idUsers', UsersController.usersDetail)
routerUsers.post('/user/create', UsersController.usersCreate)
routerUsers.put('/user/update/:idUpdate', UsersController.usersUpdate)
routerUsers.delete('/user/del/:idDel', UsersController.usersDelete)


export default routerUsers;