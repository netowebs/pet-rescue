import { Request, Response } from 'express'
import moment from 'moment';
import { CategoriesModel } from '../models/CategoriesModel';

export const categoriesList = async (req: Request, res: Response) => {
    try {
        let list = await CategoriesModel.findAll();
        res.send(list)
    } catch (error) {
        console.log(error)
    }
}

export const categoryDetail = async (req: Request, res: Response) => {
    try {
        let detail = await CategoriesModel.findOne({ where: { id: req.params.idCategory }})
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
export const categoryCreate = async (req: Request, res: Response) => {
    try {
        const { description } = req.body

        const convertDate = (dateString: string) => {
            return new Date(moment(dateString).format('YYYY-MM-DD'))
        }

        let create = await CategoriesModel.create({
            description: description
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

export const categoryDelete = async (req: Request, res: Response) => {
    try {
        const delSect = await CategoriesModel.destroy({
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

export const categoryUpdate = async (req: Request, res: Response) => {
    try {
        const { description } = req.body
        const update = await CategoriesModel.update({
            description: description
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