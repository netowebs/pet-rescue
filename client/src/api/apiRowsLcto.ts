import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001'
})

export const rowsLctoFinancial = {

    getAllRowsLcto: async (id: string) => {
        try {
            let response = await instance.get(`/rowsLctoBankFinancial/${id}`);
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    getLcto: async (id: number) => {
        try {
            let response = await instance.get(`/rowsLctoFinancial/${id}`);
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}