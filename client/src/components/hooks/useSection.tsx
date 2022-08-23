import { useEffect, useState } from "react"
import { sections as sect} from "../../api/api"

export interface Section  {
    id: number
    name: string
}

export const useSection = () => {
    const [sections, setSections] = useState<Section[]>([])

    useEffect(() =>{
        const loadSections = async () => {
            const res = await sect.getAllSections()
            setSections(res)
        }
        loadSections()
    },[])

    return{
        sections
    }
}