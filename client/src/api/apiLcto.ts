import axios from "axios";

const instance = axios.create({
    baseURL: 'http://192.168.0.103:3001'
})

export const lcto = {

    getAllLctos: async () => {
        try {
            let response = await instance.get(`/lctos`);
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    getLcto: async (id: string) => {
        try {
            return await instance.get(`/lcto/${id}`)
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
            return await instance.put(`/lcto/update/${data.id}`, data)
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
            return await instance.post(`/lcto/create`, data)
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
            return await instance.delete(`/lcto/del/${id}`)
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