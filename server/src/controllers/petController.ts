import {Request, Response} from 'express'
import {PetModel} from '../models/PetModel'

export const petList = async (req: Request, res: Response) => {
    let list = await PetModel.findAll();
    console.log(list)
    res.send(list)
}