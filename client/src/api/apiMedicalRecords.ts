import { instance } from "./instance";

export const medicalRecords = {

    getAllRecords: async () => {
        try {
            let response = await instance.get(`/medicalRecords`);
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    getMedicalRecord: async (id: string) => {
        try {
            return await instance.get(`/medicalRecords/${id}`)
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

    createMedicalRecord: async (data: any) => {
        try {
            return await instance.post(`/medicalRecords/create`, data)
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

    updateMedicalRecord: async (data: any) => {
        try {
            return await instance.put(`/medicalRecords/update/${data.id}`, data)
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