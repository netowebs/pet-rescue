import axios from "axios";

const instance = axios.create({
    baseURL: 'http://192.168.0.107:3001'
})

export const pet = {
    getAllPets: async () => {
        let response = await instance.get(`/pets`);
        return response.data
    },

    getPet: async (id: string) => {
        let response = await instance.get(`/pets/${id}`)
        return response.data
    }
}