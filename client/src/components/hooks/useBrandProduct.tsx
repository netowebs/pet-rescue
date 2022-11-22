import { useEffect, useState } from "react"
import { brand } from "../../api/apiBrandProduct"
import { Brand } from "../../types/typeBrand"

export const useBrandProduct = () => {
    const [brands, setBrands] = useState<Brand[]>([])
    useEffect(() =>{
            const loadBrand = async () => {
                const res = await brand.getAllBrands()
                setBrands(res)
            }
            loadBrand()
    },[brands])

    return{
        brands
    }
}