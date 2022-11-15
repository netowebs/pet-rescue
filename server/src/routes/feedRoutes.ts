import {Router} from 'express'
import * as FeedController from '../controllers/feedController'
const routerFeed = Router();

routerFeed.post('/feed/create', FeedController.feedCreate)

export default routerFeed;