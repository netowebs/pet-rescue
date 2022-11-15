import { instance } from "./instance";

export const tutor = {

    getAllTutors: async () => {
        try {
            let response = await instance.get(`/tutors`);
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    getTutor: async (id: string) => {
        try {
            return await instance.get(`/tutor/${id}`)
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

    updateTutor: async (data: any) => {
        try {
            return await instance.put(`/tutor/update/${data.id}`, data)
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

    createTutor: async (data: any) => {
        try {
            return await instance.post(`/tutor/create`, data)
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

    deleteTutor: async (id: string) => {
        try {
            return await instance.delete(`/tutor/del/${id}`)
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