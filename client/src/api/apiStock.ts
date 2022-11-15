import { instance } from "./instance";

export const stock = {

    getAllProducts: async () => {
        try {
            let response = await instance.get(`/products`);
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    getProduct: async (id: string) => {
        try {
            return await instance.get(`/product/${id}`)
                .then(
                    response => { return response.data }
                )
                .catch(
                    error => { return error }
                )
        } catch (error) {
            console.log(error)
        }
    },

    getProductSku: async (sku: string) => {
        try {
            return await instance.get(`/productSku/${sku}`)
                .then(
                    response => { return response.data }
                )
                .catch(
                    error => { return error }
                )
        } catch (error) {
            console.log(error)
        }
    },

    updateProduct: async (data: any) => {
        try {
            return await instance.put(`/product/update/${data.id}`, data)
                .then(
                    response => { return response.data }
                )
                .catch(
                    error => { return error }
                )
        } catch (error) {
            console.log(error)
        }
    },

    updateProductLcto: async (data: any) => {
        try {
            return await instance.put(`/product/updateLcto/${[data.idProduct]}`, data)
                .then(
                    response => { return response.data }
                )
                .catch(
                    error => { return error }
                )
        } catch (error) {
            console.log(error)
        }
    },

    updateProductMedicalRecord: async (data: any) => {
        try {
            return await instance.put(`/product/updateMedicalRecord/${[data.id]}`, data)
                .then(
                    response => { return response.data }
                )
                .catch(
                    error => { return error }
                )
        } catch (error) {
            console.log(error)
        }
    },

    createProduct: async (data: any) => {
        try {
            return await instance.post(`/product/create`, data)
                .then(
                    response => { return response.data }
                )
                .catch(
                    error => { return error }
                )
        } catch (error) {
            console.log(error)
        }
    },

    deleteProduct: async (id: string) => {
        try {
            return await instance.delete(`/product/del/${id}`)
                .then(
                    response => { return response.data }
                )
                .catch(
                    error => { return error }
                )
        } catch (error) {
            console.log(error)
        }
    }
}