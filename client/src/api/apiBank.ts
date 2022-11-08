import axios from "axios";

const instance = axios.create({
    baseURL: 'http://192.168.0.103:3001'
})

export const bank = {

    getAllBanks: async () => {
        try {
            let response = await instance.get(`/banks`);
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    getBank: async (id: string) => {
        try {
            return await instance.get(`/bank/${id}`)
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

    getBankCode: async (id: string) => {
        try {
            return await instance.get(`/bankcode/${id}`)
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

    updateBank: async (data: any) => {
        try {
            return await instance.put(`/bank/update/${data.id}`, data)
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

    createBank: async (data: any) => {
        try {
            return await instance.post(`bank/create`, data)
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

    deleteBank: async (id: string) => {
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