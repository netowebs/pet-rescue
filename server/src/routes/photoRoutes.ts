import {Router} from 'express'
import * as PhotoController from '../controllers/photoController'
const uploadUser = require('../middlewares/uploadPhoto')

const routerPhoto = Router();

routerPhoto.post('/photo/', uploadUser.single('image'), PhotoController.photo)

export default routerPhoto;