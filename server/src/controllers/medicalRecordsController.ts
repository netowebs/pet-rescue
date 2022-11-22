import { Request, Response } from 'express'
import moment from 'moment';
import { MedicalRecordsModel } from '../models/MedicalRecordsModel';
import { AnimalModel } from '../models/PetModel';
import { VetModel } from '../models/VetModel';
import { VetsMedicalRecordsModel } from '../models/VetsMedicalRecordsModel';

export const medicalRecordsList = async (req: Request, res: Response) => {
    try {
        let list = await MedicalRecordsModel.findAll({
            include: [
                {
                    model: AnimalModel,
                }
            ]
        })
            .then((data) => {
                if (data) {
                    return { success: true, data: data }
                } else {
                    return { success: false }
                }
            })
            .catch(error => {
                return { success: false, message: error.message }
            })
        res.json(list)
    } catch (error) {
        console.log(error)
    }
}

export const medicalRecordDetail = async (req: Request, res: Response) => {
    try {
        let detail = await MedicalRecordsModel.findOne({
            where: { id: req.params.idMedicalRecord },
            include: [
                {
                    model: AnimalModel,
                },
                {
                    model: VetModel,
                    as: 'VetMedical',
                    through: { attributes: [] }
                }
            ]
        }
        )
            .then((data) => {
                if (data?.id) {
                    return { success: true, data: data }
                } else {
                    return { success: false }
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

export const medicalRecordCreate = async (req: Request, res: Response) => {

    try {
        const { user, status, obs, animalId, vetRespId, vetRespName, animalName } = req.body

        const createMR = await MedicalRecordsModel.create({
            animals_id: animalId,
            user: user,
            status: status,
            obs: obs,
            animal_name: animalName,
            vet_name: vetRespName,
            statusMR: 0,
            last_change: moment().format('YYYY-MM-DD') 
        })
            .then(async () => {
                return { success: true, message: 'Cadastro Concluido com Sucesso' }
            })
            .catch(error => {
                return { success: false, message: error.message }
            })
        res.json(createMR)
        const lastEntry = await MedicalRecordsModel.findOne({
            attributes: ['id'],
            order: [['id', 'DESC']]
        })
        const updateRow = await MedicalRecordsModel.findByPk(lastEntry?.getDataValue('id'))
        await updateRow?.addVetMedical(vetRespId)
    } catch (error) {
        console.log(error)
    }
}

export const medicalRecordUpdate = async (req: Request, res: Response) => {
    try {
        const { status, last_change, idVets, listItens, eventsList, statusMr } = req.body

        const update = await MedicalRecordsModel.update({
            status, last_change, events: eventsList, itens: listItens, statusMR: statusMr
        }, {
            where: { id: req.body.idMedicalRecord }
        })
            .then(() => {
                return { success: true, message: 'Atualizado com Sucesso' }
            })
            .catch(error => {
                return { success: false, message: error.message }
            })
        res.json(update)
        let updateRow = await MedicalRecordsModel.findByPk(req.body.idMedicalRecord)
        if (idVets.length > 0) {
            await VetsMedicalRecordsModel.destroy({
                where: {
                    id_medicalRecords: updateRow?.id
                }
            })
            idVets.forEach(async (item: any, i: number) => {
                await updateRow?.addVetMedical(idVets[i])
            })
        }

    } catch (error) {
        const resp = { success: false, message: error }
        res.json(resp)
        console.log(error)

    }
}