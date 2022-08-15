import {Request, Response} from 'express'
import {PetModel} from '../models/PetModel'

export const petList = async (req: Request, res: Response) => {
    let list = await PetModel.findAll();
    res.send(list)
}

export const petDetail = async (req: Request, res: Response) => {
    let detail = await PetModel.findOne({
        where:{id:req.params.idPet}
    })
    res.send(detail)
}