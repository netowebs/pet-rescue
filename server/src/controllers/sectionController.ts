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
        console.log(error)
    }    
}

export const sectionCreate = async (req: Request, res: Response) => {
    try {
        const {name} = req.body
        let create = await SectionModel.create({
            name
        })
        .then(()=>{
            return { success: true, message: 'Cadastro Concluido com Sucesso' }
        })
        .catch(error =>{
            return { success: false, message: error.message }
        })
        res.json(create)
    } catch (error) {
        console.log(error)
    }
}

export const sectionDelete = async (req: Request, res: Response) => {
    try {
        const delSect = await SectionModel.destroy({
            where: {id: req.params.idDel}
        })
        .then(()=>{
            return { success: true, message: 'Seção Excluida' }
        })
        .catch(error =>{
            return { success: false, message: 'Antes de remover uma sessão, deves remover os apartamentos vinculados a ela, esse processo evita erros em cascata que podem prejudicar o correto funcionamento do sistema.', error}
        })
        res.send(delSect)
    } catch (error) {
        console.log(error)
    }
}