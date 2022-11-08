import { Request, Response } from 'express'
import moment from 'moment';
import { BankLctoModel } from '../models/BankLctoModel';
import { BankModel } from '../models/BankModel';
import { RowsBankLctoModel } from '../models/RowsBankLctoModel';

export const bankList = async (req: Request, res: Response) => {
    try {
        let list = await BankModel.findAll();
        res.send(list)
    } catch (error) {
        console.log(error)
    }
}

export const bankDetail = async (req: Request, res: Response) => {
    try {
        let detail = await BankModel.findOne({ where: { id: req.params.idBank }, include: [{
            model: BankLctoModel
        }]})
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

export const bankDetailCode = async (req: Request, res: Response) => {
    try {
        let detail = await BankModel.findOne({ where: { id_bank: req.params.id_bank } })
        .then((data) => {
            if(data?.id_bank){
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

export const bankCreate = async (req: Request, res: Response) => {
    try {
        const { bankName, bankId, agency, account, balance } = req.body

        const json = await BankModel.create({
            name_bank: bankName,
            id_bank: bankId,
            agency: agency,
            account: account,
            balance: balance,
        })
        .then(()=>{
            return { success: true, message: 'Cadastro Concluido com Sucesso' }
        })
        .catch(error =>{
            return { success: false, message: error.message }
        })
        res.json(json)
    } catch (error) {
        console.log(error)
    }
}

export const bankDelete = async (req: Request, res: Response) => {
    try {
        const del = await BankModel.destroy({
            where: {id: req.params.idBank}
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