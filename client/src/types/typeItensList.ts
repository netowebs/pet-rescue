export type ItensList = {
    id: number
    sku: string,
    description: string,
    qtd?: number,
    qtdProduct?: number
    vetProduct: string,
    vetIdProduct?: number
    userProduct?: string
    date?: string
    itensMedicalRecordsModel?:{
        qtd: number
        date: string
        user: string
        id_vet: number
        name_vet: string
    }
}
