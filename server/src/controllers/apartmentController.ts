import {Request, Response} from 'express'
import {ApartmentModel} from '../models/ApartmentModel'
import { SectionModel } from '../models/SectionModel';

export const apartmentList = async (req: Request, res: Response) => {
    try {
        let list = await ApartmentModel.findAll({include: SectionModel});
        res.send(list)
    } catch (error) {
        console.log(error)
    }
}

export const apartmentDetail = async (req: Request, res: Response) => {
    try {
        let detail = await ApartmentModel.findOne({where:{id:req.params.idApartments}, include: SectionModel})
        res.send(detail)
    } catch (error) {
        console.log(error)
    }    
}

// export const apartmentDetail = async (req: Request, res: Response) => {
//     try {
//         let detail = await ApartmentModel.findOne({where:{id:req.params.idApartments}, include: SectionModel})
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

export const apartmentSect = async (req: Request, res: Response) => {
    try {
        let aptSect = await ApartmentModel.findAll({where:{section_id: req.params.sectId}, include: SectionModel})
        res.send(aptSect)
    } catch (error) {
        console.log(error)
    }
}

// export const apartmentSect = async (req: Request, res: Response) => {
//     try {
//         let aptSect = await ApartmentModel.findAll({where:{section_id: req.params.sectId}, include: SectionModel})
//         .then(function(data){
//             const res = {sucess: true, data: data}
//             return res
//         })
//         .catch(error=>{
//             const res = {sucess: false, message: error}
//             return res
//         })
//         res.json(aptSect)
//     } catch (error) {
//         console.log(error)
//     }
// }