import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001'
})

export const adoption = {

    getAllAdoption: async () => {
        try {
            let response = await instance.get(`/adoptions`);
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    getAdotpion: async (id: string) => {
        try {
            return await instance.get(`/adoptions/${id}`)
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

    updateAdoption: async (data: any) => {
        try {
            return await instance.put(`/adoptions/update/${data.id}`, data)
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

    createAdoption: async (data: any) => {
        try {
            return await instance.post(`adoptions/create`, data)
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

    deleteAdoption: async (id: string) => {
        try {
            return await instance.delete(`adoptions/del/${id}`)
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