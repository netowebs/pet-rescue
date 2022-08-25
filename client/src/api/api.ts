import axios from "axios";
import { Pet } from "../types/typePet";

const instance = axios.create({
    baseURL: 'http://192.168.0.107:3001'
})

export const pet = {
    getAllPets: async () => {
        try {
            let response = await instance.get(`/pets`);
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    getPet: async (id: string) => {
        try {
            let response = await instance.get(`/pets/${id}`)
            return response.data
        } catch (error) {
            console.log(error)
        }   
    }
}

export const apartment = {
    getAllApartments: async () => {
        try {
            let response = await instance.get(`/apartments`);
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    getApartment: async (id: string) => {
        try {
            let response = await instance.get(`/apartments/${id}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    getApartmentBySection: async (section_id: string) => {
        try {
            let response = await instance.get(`/apartments/sect/${section_id}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

}

export const sections = {
    getAllSections: async () => {
        try {
            let response = await instance.get(`/sections`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    getSection: async (id: string) => {
        try {
            let response = await instance.get(`/sections/${id}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}