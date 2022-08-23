import { Apartment } from "./typeApartment"

export type Pet ={
    id: number,
    dtCad: string,
    date_rescue: string,
    name: string,
    species: string,
    size: string,
    age_approx: number,
    temperament: string,
    adoptionStatus: string,
    food: number,
    color: string,
    coat: string,
    note: string,
    ApartmentModel: {
        id: number,
        name:string,
        SectionModel:{
            id:number,
            name:string,
        }
    }
}