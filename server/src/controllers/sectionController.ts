import {Request, Response} from 'express'
import {SectionModel} from '../models/SectionModel'

export const sectionlist = async (req: Request, res: Response) => {
    try {
        let list = await SectionModel.findAll();
        res.send(list)
    } catch (error) {
        console.log(error)
    }
}

export const sectionDetail = async (req: Request, res: Response) => {
    try {
        let detail = await SectionModel.findOne({where:{id:req.params.idSection}})
        res.send(detail)
    } catch (error) {
        
    }    
}
// export const sectionDetail = async (req: Request, res: Response) => {
//     try {
//         let detail = await SectionModel.findOne({where:{id:req.params.idSection}})
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
        
//     }    
// }