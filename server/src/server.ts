import express from 'express'
import routerPet from '../src/routes/petRoutes'
import routerApartment from '../src/routes/apartmentsRoutes'
import dotenv from 'dotenv'
import cors from 'cors'
import routerSection from './routes/sectionRoutes'
import bodyParser from 'body-parser'
import routerVets from './routes/vetRoutes'
import routerTutors from './routes/tutorRoutes'
import routerCategory from './routes/categoryRoutes'
import routerBrand from './routes/brandRoutes'
import routerStock from './routes/stockRoutes'
import routerCollab from './routes/collaboratorsRoutes'
import routerUsers from './routes/usersRoutes'
import routerStockUpdate from './routes/stockUpdateRoutes'
import routerMedicalRecords from './routes/medicalRecordsRoutes'
import routerBank from './routes/bankRoutes'
import routerLctoFinancial from './routes/lctoFinancialRoutes'
import routerRowsLctoFinancial from './routes/RowsLctoFinancialRoutes'
import routerAdoption from './routes/adoptionRoutes'

dotenv.config();
const server = express();
server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:false}))

server.use(routerPet)
server.use(routerApartment)
server.use(routerSection)
server.use(routerVets)
server.use(routerTutors)
server.use(routerCategory)
server.use(routerBrand)
server.use(routerStock)
server.use(routerCollab)
server.use(routerUsers)
server.use(routerStockUpdate)
server.use(routerMedicalRecords)
server.use(routerBank)
server.use(routerLctoFinancial)
server.use(routerRowsLctoFinancial)
server.use(routerAdoption)

server.listen(process.env.PORT)