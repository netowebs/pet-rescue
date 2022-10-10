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

export const apartmentCreate = async (req: Request, res: Response) => {
    try {
        const {name, sectionId} = req.body
        let create = await ApartmentModel.create({
            name: name,
            section_id: sectionId
        })
        .then(()=>{
            return { success: true, message: 'Apartamento Cadastrado' }
        })
        .catch(error =>{
            return { success: false, message: error.message }
        })
        res.json(create)
    } catch (error) {
        console.log(error)
    }
}

export const apartmentDelete = async (req: Request, res: Response) => {
    try {
        const delSect = await ApartmentModel.destroy({
            where: {id: req.params.idDel}
        })
        .then(()=>{
            return { success: true, message: 'Apartamento Excluido' }
        })
        .catch(error =>{
            return { success: false, message: 'Existem animais vinculados a esse apartamento, para conseguir excluir deve primeiro alterar o cadastro desses animais' }
        })
        res.send(delSect)
    } catch (error) {
        console.log(error)
    }
}

export const apartmentSect = async (req: Request, res: Response) => {
    try {
        let aptSect = await ApartmentModel.findAll({where:{section_id: req.params.sectId}, include: SectionModel})
        res.send(aptSect)
    } catch (error) {
        console.log(error)
    }
}