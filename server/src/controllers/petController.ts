import {Request, Response} from 'express'
import {PetModel} from '../models/PetModel'

export const petList = async (req: Request, res: Response) => {
    try {
        let list = await PetModel.findAll();
        res.send(list)
    } catch (error) {
        console.log(error)
    }
}

export const petDetail = async (req: Request, res: Response) => {
    try {
        let detail = await PetModel.findOne({where:{id:req.params.idPet}})
        .then(function(data){
            const res = { success: true, data: data }
            return res
        })
        .catch(error=>{
            const res = { success: false, message: error}
            return res;
        })
        res.json(detail)
    } catch (error) {
        
    }

    
}