import {Router} from 'express'
import * as LoginController from '../controllers/loginController'

const routerLogin = Router();

routerLogin.post('/login/signin', LoginController.login)

export default routerLogin;