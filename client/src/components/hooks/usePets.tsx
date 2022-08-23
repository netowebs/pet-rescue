import { useEffect, useState } from "react"
import { pet } from "../../api/api"
import { Apartment } from "./useApartment"

export type Pet ={
    id: number,
    dtCad: string,
    dtRescue: string,
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
    apartment: Apartment
}

type Prop = {
    id: string
}

let initialValue: Pet

export const usePets = async({id}: Prop) => {
    const [pets, setPets] = useState<Pet>(initialValue)

    useEffect(() =>{
        if(id){
            const loadPets = async () => {
                const res = await pet.getPet(id)
                setPets(res)
            }
            loadPets()
        }else{
            return;
        }
        
    },[])

    return{
        pets
    }
}