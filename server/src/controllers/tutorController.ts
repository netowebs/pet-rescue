import { Request, Response } from 'express'
import moment from 'moment';
import { TutorModel } from '../models/TutorModel';

export const tutorList = async (req: Request, res: Response) => {
    try {
        let list = await TutorModel.findAll();
        res.send(list)
    } catch (error) {
        console.log(error)
    }
}

export const tutorDetail = async (req: Request, res: Response) => {
    try {
        let detail = await TutorModel.findOne({ where: { id: req.params.idTutor }})
        .then((data) => {
            if(data?.id){
                console.log('DEU CERTO')
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

export const tutorCreate = async (req: Request, res: Response) => {
    try {
        const { name, cpf, rg, nasc, sex, phone, cep, street, num, complement, districtName, city, state } = req.body

        const convertDate = (dateString: string) => {
            return new Date(moment(dateString).format('YYYY-MM-DD'))
        }

        let create = await TutorModel.create({
            name, cpf, rg, date_birth: convertDate(nasc), sex, phone, cep, address: street, address_num: num, complement, district: districtName, city, uf: state
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

export const tutorDelete = async (req: Request, res: Response) => {
    try {
        const delSect = await TutorModel.destroy({
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

export const tutorUpdate = async (req: Request, res: Response) => {
    try {
        const { name, cpf, rg, nasc, sex, phone, crmv, speciality, cep, street, num, complement, district, city, state } = req.body
        const update = await TutorModel.update({
            name: name,
            cpf: cpf,
            rg: rg,
            nasc: nasc,
            sex: sex,
            phone: phone,
            cep: cep,
            street: street,
            num: num,
            complement: complement,
            district: district,
            city: city,
            state: state
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