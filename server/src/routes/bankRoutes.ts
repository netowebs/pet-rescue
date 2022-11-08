import {Router} from 'express'
import * as BankController from '../controllers/bankController'

const routerBank = Router();

routerBank.get('/banks', BankController.bankList)
routerBank.get('/bank/:idBank', BankController.bankDetail)
routerBank.get('/bankcode/:id_bank', BankController.bankDetailCode)
routerBank.post('/bank/create', BankController.bankCreate)
routerBank.delete('/bank/del/:idBank', BankController.bankDelete)



export default routerBank;