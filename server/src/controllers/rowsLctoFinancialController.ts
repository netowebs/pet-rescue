import { Request, Response } from 'express'
import { RowsBankLctoModel } from '../models/RowsBankLctoModel';

export const rowsLctoBankList = async (req: Request, res: Response) => {
    try {
        let list = await RowsBankLctoModel.findAll({where: {id_bank: req.params.id_bank} })
            .then((data) => {
                if (data) {
                    return { success: true, data: data }
                } else {
                    return { success: false }
                }
            })
            .catch(error => {
                return { success: false, message: error.message }
            })
        res.json(list)
    } catch (error) {
        console.log(error)
    }
}

export const rowsLctoList = async (req: Request, res: Response) => {
    try {
        let list = await RowsBankLctoModel.findAll({where: {id_lctoBank: req.params.idLcto} })
            .then((data) => {
                if (data) {
                    return { success: true, data: data }
                } else {
                    return { success: false }
                }
            })
            .catch(error => {
                return { success: false, message: error.message }
            })
        res.json(list)
    } catch (error) {
        console.log(error)
    }
}
