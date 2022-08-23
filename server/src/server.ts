import express from 'express'
import routerPet from '../src/routes/petRoutes'
import routerApartment from '../src/routes/apartmentsRoutes'
import dotenv from 'dotenv'
import cors from 'cors'
import routerSection from './routes/sectionRoutes'

dotenv.config();
const server = express();
server.use(cors())


server.use(routerPet);
server.use(routerApartment);
server.use(routerSection)


server.listen(process.env.PORT)