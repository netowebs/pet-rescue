import { Request, Response } from 'express'
import moment from 'moment';
import { LctoProductsModel } from '../models/LctoProductsModel';

export const lctoList = async (req: Request, res: Response) => {
    try {
        let list = await LctoProductsModel.findAll();
        res.send(list)
    } catch (error) {
        console.log(error)
    }
}

export const lctoDetail = async (req: Request, res: Response) => {
    try {
        let detail = await LctoProductsModel.findOne({ where: { id: req.params.idLctoProduct }})
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
export const lctoCreate = async (req: Request, res: Response) => {
    try {
        const { description, sku, qtd, validity, brandsId, categoryId, location, cost, unit, obs, dtCad } = req.body

        const convertDate = (dateString: string) => {
            return new Date(moment(dateString).format('YYYY-MM-DD'))
        }

        let create = await LctoProductsModel.create({
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

export const lctoDelete = async (req: Request, res: Response) => {
    try {
        const delSect = await LctoProductsModel.destroy({
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

export const lctoUpdate = async (req: Request, res: Response) => {
    try {
        const { description, sku, qtd, validity, brandsId, categoryId, location, cost, unit, obs, dtCad } = req.body

        const convertDate = (dateString: string) => {
            return new Date(moment(dateString).format('YYYY-MM-DD'))
        }

        const update = await LctoProductsModel.update({
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