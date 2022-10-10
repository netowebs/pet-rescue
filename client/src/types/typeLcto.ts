export type Lcto ={
    id: number,
    date_lcto: Date
    user: {
        id: number,
        name: string,
    }
    product: {
        id: number,
        description: string
        sku: string,
        qtd: number
        validity: Date
        cost: number
    }
    qtd_itens: number
}