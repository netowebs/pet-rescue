import {Router} from 'express'
import * as SectionController from '../controllers/sectionController'

const routerSection = Router();

routerSection.get('/sections', SectionController.sectionlist)
routerSection.get('/sections/:idSection', SectionController.sectionDetail)


export default routerSection;