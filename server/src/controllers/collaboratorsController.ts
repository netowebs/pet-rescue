import { Request, Response } from 'express'
import moment from 'moment';
import * as bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { CollaboratorsModel } from '../models/CollaboratorsModel';

dotenv.config()

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
        let detail = await CollaboratorsModel.findOne({ where: { id: req.params.idCollab } })
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

export const collabCreate = async (req: Request, res: Response) => {
    try {
        const { name, cpf, rg, nasc, sex, phone, cep, street, num, complement, districtName, city, state, password, nivel, username, dtAdmission, cargo, setor, ativo, loadPhoto } = req.body

        const passwordHash = await bcrypt.hash(password, 8)
        const convertDate = (dateString: string) => {
            return new Date(moment(dateString).format('YYYY-MM-DD'))
        }

        let create = await CollaboratorsModel.create({
            name, cpf, rg, address: street, complement, address_num: num, district: districtName, cep, city, uf: state, date_birth: convertDate(nasc), sex, phone, password: passwordHash, nivel, username, cargo, setor, dtAdmission: convertDate(dtAdmission), ativo, photo: loadPhoto
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
        const convertDate = (dateString: string) => {
            return new Date(moment(dateString).format('YYYY-MM-DD'))
        }
        const { name, cpf, rg, nasc, sex, phone, cep, street, num, complement, districtName, city, state, password, nivel, username, dtAdmission, cargo, setor, ativo} = req.body

            console.log('Dentro do Collab: ',req.file)

            if (password) {
                
                let passwordHash = await bcrypt.hash(password, 8)
                const update = await CollaboratorsModel.update({
                    name, cpf, rg, address: street, complement, address_num: num, district: districtName, cep, city, uf: state, date_birth: convertDate(nasc), sex, phone, password: passwordHash, nivel, username, cargo, setor, dtAdmission: convertDate(dtAdmission), ativo
                }, {
                    where: { id: req.body.idCad }
                })
                    .then(() => {
                        return { success: true, message: 'Atualizado com Sucesso' }
                    })
                    .catch((error) => {
                        return { success: false, message: error.message }
                    })
                res.json(update)
            } else {
                const update = await CollaboratorsModel.update({
                    name, cpf, rg, address: street, complement, address_num: num, district: districtName, cep, city, uf: state, date_birth: convertDate(nasc), sex, phone, nivel, username, cargo, setor, dtAdmission: convertDate(dtAdmission), ativo}, {
                    where: { id: req.body.idCad }
                })
                    .then(() => {
                        return { success: true, message: 'Atualizado com Sucesso' }
                    })
                    .catch((error) => {
                        return { success: false, message: error.message }
                    })
                res.json(update) 
        }

    }catch (error) {
        const resp = { success: false, message: error }
        res.json(resp)
        console.log(error)
    }
}