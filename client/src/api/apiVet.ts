import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001'
})

export const vet = {

    getAllVets: async () => {
        try {
            let response = await instance.get(`/vets`);
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    getVet: async (id: string) => {
        try {
            return await instance.get(`/vet/${id}`)
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

    updateVet: async (data: any) => {
        try {
            return await instance.put(`/vet/update/${data.id}`, data)
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

    createVet: async (data: any) => {
        try {
            return await instance.post(`/vet/create`, data)
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

    deleteVet: async (id: string) => {
        try {
            return await instance.delete(`/vet/del/${id}`)
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