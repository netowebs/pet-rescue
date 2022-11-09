import { Request, Response } from 'express'
import moment from 'moment';
import { Op } from 'sequelize';
import { BankLctoModel } from '../models/BankLctoModel';
import { BankModel } from '../models/BankModel';
import { RowsBankLctoModel } from '../models/RowsBankLctoModel';
import { StockModel } from '../models/StockModel';
import { StockUpdateModel } from '../models/StockUpdateModel';

export const lctoBankList = async (req: Request, res: Response) => {
    try {
        let list = await BankLctoModel.findAll({
            include: [{
                model: BankModel
            },{
                model: RowsBankLctoModel,
            }]
            
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

export const lctoBankDetail = async (req: Request, res: Response) => {
    try {
        let detail = await BankLctoModel.findOne({
            where: { id: req.params.idLctoFinancial },
            include:[
                {
                    model: RowsBankLctoModel
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

export const lctoBankCreate = async (req: Request, res: Response) => {
    try {
        const { arrLctos, user, dtCad, idBank, nameBank, agency, account, idCad, totCredito, totDebito } = req.body

        const lctoCreate = await BankLctoModel.create({
            id_bank: idCad,
            user: user,
            agency, account, totCredito, totDebito, name_bank: nameBank, code_bank: idBank
        })
            .then(async () => {
                return { success: true, message: 'Cadastro Concluido com Sucesso' }
            })
            .catch(error => {
                return { success: false, message: error.message }
            })
        res.json(lctoCreate)
        const lastEntry = await BankLctoModel.findOne({
            attributes: ['id'],
            order: [['id', 'DESC']]
        })

        const updateRow = await BankLctoModel.findByPk(lastEntry?.getDataValue('id'))
        if(arrLctos.length > 0 ){
            arrLctos.forEach(async (item: any, i: number)=> {
                RowsBankLctoModel.create(
                    {
                        ttype: arrLctos[i].type, 
                        id_bank: idCad, 
                        vvalue: (parseFloat(arrLctos[i].value.replace(/[R$]/g, '').replace(/[',']/, '.'))),
                        description: arrLctos[i].description,
                        id_lctoBank: updateRow?.id
                    }
                ) 
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}

export const lctoBankUpdate = async (req: Request, res: Response) => {
    try {
        const { arrLctos, user, dtCad, idBank, nameBank, agency, account, id, totCredito, totDebito, idBankDb } = req.body

        const lctoCreate = await BankLctoModel.update(
            {
                totCredito, totDebito
            },
            {where:{
                id: id
            }}
        )
            .then(async () => {
                return { success: true, message: 'Cadastro Concluido com Sucesso' }
            })
            .catch(error => {
                return { success: false, message: error.message }
            })
        res.json(lctoCreate)
        const lastEntry = await BankLctoModel.findOne({
            attributes: ['id'],
            order: [['id', 'DESC']]
        })

        const updateRow = await BankLctoModel.findByPk(lastEntry?.getDataValue('id'))
        if(arrLctos.length > 0 ){
            const rowsExist = await RowsBankLctoModel.findByPk(updateRow?.id)
                RowsBankLctoModel.destroy({where:{
                    id_lctoBank: updateRow?.id
                }})
            arrLctos.forEach(async (item: any, i: number)=> {
                RowsBankLctoModel.create(
                    {
                        ttype: arrLctos[i].type, 
                        id_bank: idBankDb, 
                        vvalue: (parseFloat(arrLctos[i].value.replace(/[R$]/g, '').replace(/[',']/, '.'))),
                        description: arrLctos[i].description,
                        id_lctoBank: updateRow?.id
                    }
                ) 
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}