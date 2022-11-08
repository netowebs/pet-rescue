import { Request, Response } from 'express'
import moment from 'moment';
import { VetModel } from '../models/VetModel';

export const vetList = async (req: Request, res: Response) => {
    try {
        let list = await VetModel.findAll();
        res.send(list)
    } catch (error) {
        console.log(error)
    }
}

export const vetDetail = async (req: Request, res: Response) => {
    try {
        let detail = await VetModel.findOne({ where: { id: req.params.idVet }})
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

export const vetCreate = async (req: Request, res: Response) => {
    try {
        const { name, cpf, rg, nasc, sex, phone, crmv, speciality, cep, street, num, complement, districtName, city, state, dtCad } = req.body

        const convertDate = (dateString: string) => {
            return new Date(moment(dateString).format('YYYY-MM-DD'))
        }

        let create = await VetModel.create({
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

export const vetDelete = async (req: Request, res: Response) => {
    try {
        const delSect = await VetModel.destroy({
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

export const vetUpdate = async (req: Request, res: Response) => {
    try {
        const { name, cpf, rg, nasc, sex, phone, crmv, speciality, cep, street, num, complement, district, city, state, dtCad } = req.body
        const update = await VetModel.update({
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