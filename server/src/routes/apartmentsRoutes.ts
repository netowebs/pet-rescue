import {Router} from 'express'
import * as ApartmentController from '../controllers/apartmentController'

const routerApartment = Router();

routerApartment.get('/apartments', ApartmentController.apartmentList)
routerApartment.get('/apartments/:idApartments', ApartmentController.apartmentDetail)
routerApartment.get('/apartments/sect/:sectId', ApartmentController.apartmentSect)


export default routerApartment;