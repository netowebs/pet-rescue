import { useEffect, useState } from "react"
import { apartment } from "../../api/api"
import { Section } from "../datatableApartments/typeApartment"

export interface Apartment  {
    id: number
    name: string
    section: Section
}

type Prop = {
    sectId: string
}

export const useApartments = ({sectId}:Prop) => {
    const [apts, setApts] = useState<Apartment[]>([])
    useEffect(() =>{
        if(sectId){
            const loadApartments = async () => {
                const res = await apartment.getApartmentBySection(sectId)
                setApts(res)
            }
            loadApartments()
        }else{
            return;
        }
        
    },[sectId])

    return{
        apts
    }
}