import { Request, Response } from 'express'
import moment from 'moment';
import { ApartmentModel } from '../models/ApartmentModel';
import { AnimalModel } from '../models/PetModel'

export const petList = async (req: Request, res: Response) => {
    try {
        let list = await AnimalModel.findAll({ include: ApartmentModel });
        res.send(list)
    } catch (error) {
        console.log(error)
    }
}

export const petDetail = async (req: Request, res: Response) => {
    try {
        let detail = await AnimalModel.findOne({ where: { id: req.params.idPet }, include: ApartmentModel })
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

export const petUpdate = async (req: Request, res: Response) => {
    try {
        const { name, species, adptionStatus, sex, age, temperament, size, note, food, color, coat, apartmentId } = req.body
        const update = await AnimalModel.update({
            name: name,
            species: species,
            status: adptionStatus,
            sex: sex,
            age_approx: age,
            temperament: temperament,
            size: size,
            note: note,
            qtd_food: food,
            color: color,
            coat_size: coat,
            apartment_id: apartmentId
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

export const petCreate = async (req: Request, res: Response) => {
    try {
        const { dtRescue, name, species, adptionStatus, sex, age, temperament, size, note, food, color, coat, apartmentId } = req.body
        const convertDate = (dateString: string) => {
            return new Date(moment(dateString).format('YYYY-MM-DD'))
        }
        const createPet = await AnimalModel.create({
            name: name,
            date_rescue: convertDate(dtRescue),
            species: species,
            status: adptionStatus,
            sex: sex,
            age_approx: age,
            temperament: temperament,
            size: size,
            note: note,
            qtd_food: food,
            color: color,
            coat_size: coat,
            apartment_id: apartmentId
        })
        .then(()=>{
            return { success: true, message: 'Cadastro Concluido com Sucesso' }
        })
        .catch(error =>{
            return { success: false, message: error.message }
        })
        res.json(createPet)
    } catch (error) {
        console.log(error)
    }
}

export const petDelete = async (req: Request, res: Response) => {
    try {
        const del = await AnimalModel.destroy({
            where: {id: req.params.idDel}
        })
        .then(()=>{
            return { success: true, message: 'Cadastro Excluido com Sucesso' }
        })
        .catch(error =>{
            return { success: false, message: error.message }
        })
        res.send(del)
    } catch (error) {
        console.log(error)   
    }
}