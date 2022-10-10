import { Request, Response } from 'express'
import moment from 'moment';
import { StockModel } from '../models/StockModel';

export const productsList = async (req: Request, res: Response) => {
    try {
        let list = await StockModel.findAll();
        res.send(list)
    } catch (error) {
        console.log(error)
    }
}

export const productDetail = async (req: Request, res: Response) => {
    try {
        let detail = await StockModel.findOne({ where: { id: req.params.idProduct }})
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
export const productCreate = async (req: Request, res: Response) => {
    try {
        const { description, sku, qtd, validity, brandsId, categoryId, location, cost, unit, obs, dtCad } = req.body

        const convertDate = (dateString: string) => {
            return new Date(moment(dateString).format('YYYY-MM-DD'))
        }

        console.log('Nova Data: ' + validity)

        let create = await StockModel.create({
            description: description,
            sku: sku,
            qtd: qtd,
            validity: convertDate(validity),
            brands: brandsId,
            categoryId: categoryId,
            location: location,
            cost: cost,
            unit: unit,
            obs: obs,
            date_cad: dtCad
        })
        .then(() => {
            return { success: true, message: 'Cadastro Concluido com Sucesso' }
        })
        .catch(error => {
            return { success: false, message: error.message }
        })
        res.json(create)
    } catch (error) {
        console.log(error)
    }
}

export const productDelete = async (req: Request, res: Response) => {
    try {
        const delSect = await StockModel.destroy({
            where: { id: req.params.idDel }
        })
            .then(() => {
                return { success: true, message: 'Cidade Excluida' }
            })
            .catch(error => {
                return { success: false, message: 'Antes de remover uma sessão, deves remover os apartamentos vinculados a ela, esse processo evita erros em cascata que podem prejudicar o correto funcionamento do sistema.', error }
            })
        res.send(delSect)
    } catch (error) {
        console.log(error)
    }
}

export const productUpdate = async (req: Request, res: Response) => {
    try {
        const { description, sku, qtd, validity, brandsId, categoryId, location, cost, unit, obs, dtCad } = req.body

        const convertDate = (dateString: string) => {
            return new Date(moment(dateString).format('YYYY-MM-DD'))
        }

        const update = await StockModel.update({
            description: description,
            sku: sku,
            qtd: qtd,
            validity: convertDate(validity),
            brandsId: brandsId,
            categoryId: categoryId,
            location: location,
            cost: cost,
            unit: unit,
            obs: obs,
            date_cad: dtCad
        }, {
            where: { id: req.body.idCad }
        })
            .then(() => {
                return { success: true, message: 'Atualizado com Sucesso' }
            })
            .catch(error => {
                return { success: false, message: error.message }
            })
        res.json(update)
    } catch (error) {
        const resp = { success: false, message: error }
        res.json(resp)
        console.log(error)

    }
}