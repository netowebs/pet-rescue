import { Request, Response } from 'express'
import moment from 'moment';
import { CollaboratorsModel } from '../models/CollaboratorsModel';

export const collabList = async (req: Request, res: Response) => {
    try {
        let list = await CollaboratorsModel.findAll();
        res.send(list)
    } catch (error) {
        console.log(error)
    }
}

export const collabDetail = async (req: Request, res: Response) => {
    try {
        let detail = await CollaboratorsModel.findOne({ where: { id: req.params.idCollab }})
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
export const collabCreate = async (req: Request, res: Response) => {
    try {
        const { name, cpf, rg, nasc, sex, phone, crmv, speciality, cep, street, num, complement, districtName, city, state, dtCad } = req.body

        const convertDate = (dateString: string) => {
            return new Date(moment(dateString).format('YYYY-MM-DD'))
        }

        let create = await CollaboratorsModel.create({
            name, cpf, rg, date_birth: convertDate(nasc), sex, phone, crmv, speciality, cep, address: street, address_num: num, complement, district: districtName, city, uf: state, date_cad: dtCad
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

export const collabDelete = async (req: Request, res: Response) => {
    try {
        const delSect = await CollaboratorsModel.destroy({
            where: { id: req.params.idDel }
        })
            .then(() => {
                return { success: true, message: 'Colaborador' }
            })
            .catch(error => {
                return { success: false, message: 'Antes de remover uma sessão, deves remover os apartamentos vinculados a ela, esse processo evita erros em cascata que podem prejudicar o correto funcionamento do sistema.', error }
            })
        res.send(delSect)
    } catch (error) {
        console.log(error)
    }
}

export const collabUpdate = async (req: Request, res: Response) => {
    try {
        const { name, cpf, rg, nasc, sex, phone, crmv, speciality, cep, street, num, complement, district, city, state, dtCad } = req.body
        const update = await CollaboratorsModel.update({
            name: name,
            cpf: cpf,
            rg: rg,
            nasc: nasc,
            sex: sex,
            phone: phone,
            crmv: crmv,
            speciality: speciality,
            cep: cep,
            street: street,
            num: num,
            complement: complement,
            district: district,
            city: city,
            state: state,
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