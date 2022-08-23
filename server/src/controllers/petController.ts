import {Request, Response} from 'express'
import { ApartmentModel } from '../models/ApartmentModel';
import {AnimalModel} from '../models/PetModel'

export const petList = async (req: Request, res: Response) => {
    try {
        let list = await AnimalModel.findAll({include: ApartmentModel});
        res.send(list)
    } catch (error) {
        console.log(error)
    }
}

export const petDetail = async (req: Request, res: Response) => {
    try {
        let detail = await AnimalModel.findOne({where:{id:req.params.idPet}, include: ApartmentModel})
        res.send(detail)
    } catch (error) {
        console.log(error)
    }    
}

// export const petDetail = async (req: Request, res: Response) => {
//     try {
//         let detail = await AnimalModel.findOne({where:{id:req.params.idPet}, include: ApartmentModel})
//         .then(function(data){
//             const res = { success: true, data: data }
//             return res
//         })
//         .catch(error=>{
//             const res = { success: false, message: error}
//             return res;
//         })
//         res.json(detail)
//     } catch (error) {
//         console.log(error)
//     }    
// }