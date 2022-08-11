import express from 'express'
import routerPet from '../src/routes/petRoutes'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();
const server = express();
server.use(cors())


server.use(routerPet);


server.listen(process.env.PORT)