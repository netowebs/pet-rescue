import { Request, Response } from 'express'
import moment from 'moment';
import { BrandsModel } from '../models/BrandsModel';

export const brandsList = async (req: Request, res: Response) => {
    try {
        let list = await BrandsModel.findAll();
        res.send(list)
    } catch (error) {
        console.log(error)
    }
}

export const brandDetail = async (req: Request, res: Response) => {
    try {
        let detail = await BrandsModel.findOne({ where: { id: req.params.idBrand }})
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
export const brandCreate = async (req: Request, res: Response) => {
    try {
        const { name } = req.body

        const convertDate = (dateString: string) => {
            return new Date(moment(dateString).format('YYYY-MM-DD'))
        }

        let create = await BrandsModel.create({
            name
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

export const brandDelete = async (req: Request, res: Response) => {
    try {
        const delSect = await BrandsModel.destroy({
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

export const brandUpdate = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        const update = await BrandsModel.update({
            name: name
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