import { useEffect, useState } from "react"
import { cat } from "../../api/apiCategoryProduct"
import { Category } from "../../types/typeCategory"

export const useCategoryProduct = () => {
    const [categories, setCategories] = useState<Category[]>([])
    useEffect(() =>{
            const loadCategory = async () => {
                const res = await cat.getAllCategories()
                setCategories(res)
            }
            loadCategory()
    },[])

    return{
        categories
    }
}