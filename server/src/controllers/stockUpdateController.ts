import { Request, Response } from 'express'
import moment from 'moment';
import { StockModel } from '../models/StockModel';
import { StockUpdateModel } from '../models/StockUpdateModel';

export const stockUpdateList = async (req: Request, res: Response) => {
    try {
        let list = await StockUpdateModel.findAll({
            include: [
                {
                    model: StockModel,
                    as: 'Stock',
                    through: { attributes: []}
                }
            ]
        })
        .then((data) =>{
            if(data){
                return { success: true, data: data}
            }else{
                return { success: false}
            }
        })
        .catch(error => {
            return { success: false, message: error.message}
        })
        res.json(list)
    } catch (error) {
        console.log(error)
    }
}

export const stockUpdateDetail = async (req: Request, res: Response) => {
    try {
        let detail = await StockUpdateModel.findOne({where: {id: req.params.idStockUpdate},
            include: [
                {
                    model: StockModel,
                    as: 'Stock',
                    through: { attributes: []}
                }
            ]
        }
        )
        .then((data) => {
            if(data?.id){
                return { success: true, data: data}
            }else{
                return{success: false}
            }
        })
        .catch(error => {
            return { success: false, message: error.message }
        })
        res.json(detail)
    } catch (error) {
        console.log(error)
    }
}

export const updateStockCreate = async (req: Request, res: Response) => {
    try {
        const { arrProduct, ...data } = req.body

        const convertDate = (dateString: string) => {
            return new Date(moment(dateString).format('YYYY-MM-DD'))
        }

        const updateCreate = await StockUpdateModel.create({
            date: convertDate(data.date),
            nf: data.nf,
            qtdItens: data.qtdItens,
            amount: data.amount,
            donation: data.donation,
            withdraw: data.withdraw,
            user: data.user,
        })
        .then(async () => {
            return { success: true, message: 'Cadastro Concluido com Sucesso' }
        })        
        .catch(error => {
            return { success: false, message: error.message }
        })
        res.json(updateCreate)
        const lastEntry = await StockUpdateModel.findOne({
            attributes: ['id'],
            order: [['id', 'DESC']]
        })
        const updateRow = await StockUpdateModel.findByPk(lastEntry?.getDataValue('id'))
        await updateRow?.setStock(arrProduct)
    } catch (error) {
        console.log(error)
    }
}