import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001'
})

export const stockUpdate = {

    // getAllUpdates: async () => {
    //     try {
    //         let response = await instance.get(`/stockUpdates`);
    //         return response.data
    //     } catch (error) {
    //         console.log(error)
    //     }
    // },

    // getUpdate: async (id: string) => {
    //     try {
    //         return await instance.get(`/stocUpdate/${id}`)
    //             .then(
    //                 response => { return response.data }
    //             )
    //             .catch(
    //                 error => { return error }
    //             )
    //     } catch (error) {
    //         console.log(error)
    //     }
    // },

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

    // deleteUpdate: async (id: string) => {
    //     try {
    //         return await instance.delete(`/stockUpdate/del/${id}`)
    //             .then(
    //                 response => { return response.data }
    //             )
    //             .catch(
    //                 error => { return error }
    //             )
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}