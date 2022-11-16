import { useEffect, useState } from "react"
import { apartment } from "../../api/api"
import { Section } from "../../types/typeSection"

export interface Apartment  {
    id: number
    name: string
    section: Section
}

type Prop = {
    newSection: number
}

export const useApartments = ({newSection}:Prop) => {
    const [apts, setApts] = useState<Apartment[]>([])
    useEffect(() =>{
        if(newSection){
            const loadApartments = async () => {
                const res = await apartment.getApartmentBySection(newSection.toString())
                setApts(res)
            }
            loadApartments()
        }else{
            return;
        }
    },[newSection])

    return{
        apts
    }
}