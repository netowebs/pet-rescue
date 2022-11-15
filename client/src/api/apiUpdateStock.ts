import { instance } from "./instance";

export const stockUpdate = {

    getAllUpdates: async () => {
        try {
            let response = await instance.get(`/stockUpdates`);
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    getUpdate: async (id: string) => {
        try {
            return await instance.get(`/stockUpdate/${id}`)
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

    createUpdate: async (data: any) => {
        try {
            return await instance.post(`/stockUpdate/create`, data)
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