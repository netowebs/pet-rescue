import { Bank } from "./typeBank"

export type Lcto ={
    id: number,
    date: Date,
    nf: number,
    qtd_itens: number,
    id_bank: number
    amount: number,
    donation: number,
    BankModel: Bank
    user: string,
    provider: string
}