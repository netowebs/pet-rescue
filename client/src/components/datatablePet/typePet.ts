export type Pet  = {
    id: number,
    adoptions_id: number,
    apartment_id: number,
    name: string,
    date_rescue: Date,
    status: 'DISPONIVEL' | 'INDISPONIVEL',
    sex: 'MACHO' | 'FEMEA',
    age_approx: number
    species: string,
    temperament: string,
    size: 'PEQUENO' | 'MEDIO' | 'GRANDE',
    note: string
}