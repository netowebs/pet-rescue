import axios from "axios";

const instanceCep = axios.create({
    baseURL: 'http://viacep.com.br/ws'
})

export const viaCep = {

    getCep: async (cep: string) => {
        try {
            let response = await instanceCep.get(`/${cep}/json`);
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
}