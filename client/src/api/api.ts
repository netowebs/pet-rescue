import axios from "axios";

const instance = axios.create({
    baseURL: 'http://192.168.0.103:3001'
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
            return await instance.get(`/pets/${id}`)
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

    updatePet: async (data: any) => {
        try {
            return await instance.put(`/pets/update/${data.id}`, data)
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

    createPet: async (data: any) => {
        try {
            return await instance.post(`pets/create`, data)
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

    deletePet: async (id: string) => {
        try {
            return await instance.delete(`pets/del/${id}`)
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
    },

    createApartment: async (data: any) => {
        try {
            return await instance.post(`apartments/new`, data)
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

    deleteApartment: async (id: string) => {
        try {
            return await instance.delete(`apartments/del/${id}`)
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
    },

    createSection: async (data: any) => {
        try {
            return await instance.post(`sections/new`, data)
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

    deleteSection: async (id: string) => {
        try {
            return await instance.delete(`sections/del/${id}`)
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

export const medicalRecords = {
    getAllMedicalRecords: async () => {
        try {
            let response = await instance.get(`/sections`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    getMedicalRecord: async (id: string) => {
        try {
            let response = await instance.get(`/sections/${id}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    createMedicalRecord: async (data: any) => {
        try {
            return await instance.post(`sections/new`, data)
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

    deleteMedicalRecord: async (id: string) => {
        try {
            return await instance.delete(`sections/del/${id}`)
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