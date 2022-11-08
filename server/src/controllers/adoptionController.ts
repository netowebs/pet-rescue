import { Request, Response } from 'express'
import moment from 'moment';
import { AdoptionModel } from '../models/AdoptionModel';
import { AnimalModel } from '../models/PetModel'
import { TutorModel } from '../models/TutorModel';

export const adoptionList = async (req: Request, res: Response) => {
    try {
        let list = await AdoptionModel.findAll({ include: [{model: AnimalModel},{model: TutorModel}] });
        res.send(list)
    } catch (error) {
        console.log(error)
    }
}

export const adoptionDetail = async (req: Request, res: Response) => {
    try {
        let detail = await AdoptionModel.findOne({ where: { id: req.params.idAdoption }})
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

// export const petUpdate = async (req: Request, res: Response) => {
//     try {
//         const { name, species, adptionStatus, sex, age, temperament, size, note, food, color, coat, apartmentId } = req.body
//         const update = await AnimalModel.update({
//             name: name,
//             species: species,
//             status: adptionStatus,
//             sex: sex,
//             age_approx: age,
//             temperament: temperament,
//             size: size,
//             note: note,
//             qtd_food: food,
//             color: color,
//             coat_size: coat,
//             apartment_id: apartmentId
//         }, {
//             where: { id: req.body.idCad }
//         })
//             .then(() => {
//                 return { success: true, message: 'Atualizado com Sucesso' }
//             })
//             .catch(error => {
//                 return { success: false, message: error.message }
//             })
//         res.json(update)
//     } catch (error) {
//         const resp = { success: false, message: error }
//         res.json(resp)
//         console.log(error)

//     }
// }

export const adoptionCreate = async (req: Request, res: Response) => {
    try {
        const { animalId, tutorId, user } = req.body
        
        const send = await AdoptionModel.create({
            user,
            id_animal: animalId,
            id_tutor: tutorId
        })
        .then(async ()=>{
            return { success: true, message: 'Cadastro Concluido com Sucesso' }
        })
        .catch(error =>{
            return { success: false, message: error.message }
        })
        res.json(send)
    } catch (error) {
        console.log(error)
    }
}

export const adoptionDelete = async (req: Request, res: Response) => {
    try {
        const del = await AdoptionModel.destroy({
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