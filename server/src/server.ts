import express, {Request, Response} from 'express'
import mainRoutes from './routes/index'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config();
const server = express();

server.use(mainRoutes);


server.listen(process.env.PORT)