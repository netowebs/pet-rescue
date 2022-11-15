import { Request, Response } from 'express'
import moment from 'moment';
import { StockModel } from '../models/StockModel';

export const productsList = async (req: Request, res: Response) => {
    try {
        let list = await StockModel.findAll();
        res.send(list)
    } catch (error) {
        console.log(error)
    }
}

export const productDetail = async (req: Request, res: Response) => {
    try {
        let detail = await StockModel.findOne({ where: { id: req.params.idProduct }})
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

export const productDetailSku = async (req: Request, res: Response) => {
    try {
        let detail = await StockModel.findOne({ where: { sku: req.params.skuProduct }})
        .then((data) => {
            if(data?.sku){
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

export const productCreate = async (req: Request, res: Response) => {
    try {
        const { description, sku, qtd, validity, brand, category, location, cost, unit, obs, dtCad, qtdMin } = req.body

        const convertCost = (costString: string) => {
            return parseFloat(costString.replace(/[R$]/g, '').replace(/[',']/, '.'))
        }

        const convertDate = (dateString: string) => {
            return new Date(moment(dateString).format('YYYY-MM-DD'))
        }      

        let create = await StockModel.create({
            description: description,
            sku: sku,
            qtd: qtd,
            qtdMin,
            validity: convertDate(validity),
            brands_id: brand,
            categories_id: category,
            location: location,
            cost: convertCost(cost),
            unit: unit,
            obs: obs,
            date_cad: dtCad
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

export const productDelete = async (req: Request, res: Response) => {
    try {
        const delSect = await StockModel.destroy({
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

export const productUpdate = async (req: Request, res: Response) => {
    try {
        const { description, sku, qtd, validity, brand, category, location, cost, unit, obs, dtCad, qtdMin } = req.body
        
        const convertCost = (costString: string) => {
            return parseFloat(costString.replace(/[R$]/g, '').replace(/[',']/, '.'))
        }

        const convertDate = (dateString: string) => {
            return new Date(moment(dateString).format('YYYY-MM-DD'))
        }

        const update = await StockModel.update({
            description: description,
            sku: sku,
            qtd: qtd,
            qtdMin,
            validity: convertDate(validity),
            brands_id: brand,
            categories_id: category,
            location: location,
            cost: convertCost(cost),
            unit: unit,
            obs: obs,
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

export const productUpdateLcto = async (req: Request, res: Response) => {
    try {
        const { ...productLcto } = req.body

        const convertDate = (dateString: string) => {
            return new Date(moment(dateString).format('YYYY-MM-DD'))
        }

        const convertCost = (costString: string) => {
            return parseFloat(costString.replace(/[R$]/g, '').replace(/[',']/, '.'))
        }

        const update = await StockModel.update({
            qtd: (productLcto.qtd),
            validity: convertDate(productLcto.validity),
            cost: convertCost(productLcto.cost)
        }, {
            where: { id: productLcto.idProduct }
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

export const productUpdateMedicalRecord = async (req: Request, res: Response) => {
    try {
        const { ...stockQtd } = req.body

        const update = await StockModel.update({
            qtd: (stockQtd.newOld),
        }, {
            where: { id: stockQtd.id }
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