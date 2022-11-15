import { instance } from "./instance"

export const stockUpdate = {
    createUpdate: async (data: any) => {
        try {
            return await instance.post(`/itensStockUpdate/create`, data)
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

}