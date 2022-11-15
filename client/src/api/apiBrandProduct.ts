import { instance } from "./instance";

export const brand = {

    getAllBrands: async () => {
        try {
            let response = await instance.get(`/brands`);
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    getBrand: async (id: string) => {
        try {
            return await instance.get(`/brand/${id}`)
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

    updateBrand: async (data: any) => {
        try {
            return await instance.put(`/brand/update/${data.id}`, data)
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

    createBrand: async (data: any) => {
        try {
            return await instance.post(`/brand/create`, data)
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

    deleteBrand: async (id: string) => {
        try {
            return await instance.delete(`/brand/del/${id}`)
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