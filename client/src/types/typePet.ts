import { Apartment } from "./typeApartment"

export type Pet ={
    id: number,
    dtCad: string,
    adoption_id: number
    date_rescue: string,
    name: string,
    species: string,
    size: string,
    age_approx: number,
    temperament: string,
    status: string,
    food: number,
    color: string,
    coat: string,
    note: string,
    sex: string,
    ApartmentModel: {
        id: number,
        name:string,
        SectionModel:{
            id:number,
            name:string,
        }
    }
}