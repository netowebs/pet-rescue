import { Request, Response } from 'express'
import { FeedModel } from '../models/FeedModels';


export const feedCreate = async (req: Request, res: Response) => {
    try {
        const { listPets, user } = req.body

        let data:any[] = []

        listPets.forEach((item:any) => {
            data = [...data, {id_animal: item.petId, id_stock: item.stockId, qtdFood: item.petQtdFood, user: user}]
        })

        let json = await FeedModel.bulkCreate(data)
        .then(() => {
            return { success: true, message: 'Alimentados' }
        })
        .catch((error) =>{
            return { success: false, message: error.message }
        })
        res.json(json)

    } catch (error) {
        console.log(error)
    }
}
