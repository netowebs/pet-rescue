import axios from "axios";

const instanceCep = axios.create({
    baseURL: 'https://brasilapi.com.br/api/banks/v1'
})

export const banks = {

    getApiBank: async (idBank: number) => {
        try {
            let response = await instanceCep.get(`/${idBank}`);
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
}