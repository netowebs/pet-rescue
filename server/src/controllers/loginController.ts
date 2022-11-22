import e, { Request, Response } from 'express'
import { CollaboratorsModel } from '../models/CollaboratorsModel'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

export const login = async (req: Request, res: Response) => {

    try {
        const { id, password } = req.body

        const user: any = await CollaboratorsModel.findOne({
            where: {
                id
            }
        })
            .then(async (data) => {
                if (await bcrypt.compareSync(password, data?.password!)) {
                    const token = jwt.sign({ id: data?.id }, process.env.APP_SECRET as string, {
                        expiresIn: '1d'
                    })
                    const resData = {
                        id: data?.id,
                        name: data?.name,
                        nivel: data?.nivel,
                        username: data?.username,
                        token
                    }
                    return res.json(resData)
                } else {
                    const resp = { success: false, message: 'Senha Incorreta' }
                    res.json(resp)
                }
            })
            .catch((error) => {
                return { success: false, message: error.message }
            })
            .catch((error) => {
                return { success: false, message: error.message }
            })
    } catch (error) {
        const resp = { success: false, message: error }
        res.json(resp)
    }
}

export const validate = async (req: Request, res: Response) => {

    try {
        const { id, password } = req.body

        const user: any = await CollaboratorsModel.findOne({
            where: {
                id
            }
        })
            .then(async (data) => {
                if (await bcrypt.compare(password, String(data?.password))) {
                    const token = jwt.sign({ id: data?.id }, process.env.APP_SECRET as string, {
                        expiresIn: '1d'
                    })

                    const resData = {
                        id: data?.id,
                        name: data?.name,
                        nivel: data?.nivel,
                        username: data?.username,
                        token
                    }
                    return res.json(resData)
                } else {
                    const resp = { success: false }
                    res.json(resp)
                }
            })
            .catch((error) => {
                return { success: false, message: error.message }
            })
            .catch((error) => {
                return { success: false, message: error.message }
            })
    } catch (error) {
        const resp = { success: false, message: error }
        res.json(resp)
    }
}