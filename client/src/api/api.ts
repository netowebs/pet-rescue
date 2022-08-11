import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001'
})

export const pet = {
    getAllPets: async () => {
        let response = await instance.get(`/pets`);
        return response.data
    }
}