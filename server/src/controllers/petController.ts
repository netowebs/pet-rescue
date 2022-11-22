import { Request, Response } from 'express'
import moment from 'moment';
import { ApartmentModel } from '../models/ApartmentModel';
import { AnimalModel } from '../models/PetModel'
import { StockModel } from '../models/StockModel';

export const petList = async (req: Request, res: Response) => {

    try {
        let list = await AnimalModel.findAll({ include: [
            {
                model: ApartmentModel
            },
            {
                model: StockModel
            }
        ] });
        res.send(list)
    } catch (error) {
        console.log(error)
    }
}

export const petDetail = async (req: Request, res: Response) => {
    try {
        let detail = await AnimalModel.findOne({ where: { id: req.params.idPet }, 
            include: [
                {
                    model:  ApartmentModel
                },
                {
                    model: StockModel
                }
            ] })
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
        const { name, species, adptionStatus, sex, age, temperament, size, note, food, color, coat, idApartment, idFood } = req.body

        const update = await AnimalModel.update({
            name, species, status: adptionStatus, sex, age_approx: age, temperament, size, note, qtd_food: food, color, coat_size: coat, apartment_id: idApartment, id_stock: idFood
        }, {
            where: { id: req.body.idCad }
        })
            .then(() => {
                return { success: true, message: 'CADASTRO ATUALIZADO COM SUCESSO ' }
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
        const { dtRescue, name, species, adptionStatus, sex, age, temperament, size, note, food, color, coat, idApartment, idFood, user } = req.body

        console.log('DATA RESGATE VINDO: ', dtRescue)

        const convertDate = (dateString: string) => {
            return new Date(moment(dateString).format('YYYY-MM-DD'))
        }

        console.log('DATA RESGATE CONVERTIDO: ', moment(dtRescue).format('YYYY-MM-DD'))
        const createPet = await AnimalModel.create({
            name, date_rescue: convertDate(dtRescue), species, status: adptionStatus, sex, age_approx: age, temperament, size, note,
            qtd_food: food, color, coat_size: coat, apartment_id: idApartment, id_stock: idFood, user})

        .then(()=>{
            return { success: true, message: 'CADASTRO CONCLUIDO COM SUCESSO' }
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
            return { success: true, message: 'CADASTRO EXCLUIDO COM SUCESSO' }
        })
        .catch(error =>{
            return { success: false, message: error.message }
        })
        res.send(del)
    } catch (error) {
        console.log(error)   
    }
}