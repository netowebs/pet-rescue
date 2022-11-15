import { instance } from "./instance";

export const cat = {

    getAllCategories: async () => {
        try {
            let response = await instance.get(`/categories`);
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    getCategory: async (id: string) => {
        try {
            return await instance.get(`/category/${id}`)
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

    updateCategory: async (data: any) => {
        try {
            return await instance.put(`/category/update/${data.id}`, data)
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

    createCategory: async (data: any) => {
        try {
            return await instance.post(`/category/create`, data)
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

    deleteCategory: async (id: string) => {
        try {
            return await instance.delete(`/category/del/${id}`)
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