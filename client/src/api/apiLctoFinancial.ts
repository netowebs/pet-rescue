import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001'
})

export const lctoFinancial = {

    getAllLcto: async () => {
        try {
            let response = await instance.get(`/lctosFinancial`);
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    getLcto: async (id: string) => {
        try {
            return await instance.get(`/lctosFinancial/${id}`)
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

    updateLcto: async (data: any) => {
        try {
            return await instance.put(`/lctoFinancial/update/${data.id}`, data)
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

    createLcto: async (data: any) => {
        try {
            return await instance.post(`lctoFinancial/create`, data)
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

    deleteLcto: async (id: string) => {
        try {
            return await instance.delete(`bank/del/${id}`)
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