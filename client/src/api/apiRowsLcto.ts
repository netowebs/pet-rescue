import { instance } from "./instance";

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