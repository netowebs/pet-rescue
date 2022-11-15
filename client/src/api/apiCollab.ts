import { instance } from "./instance";

export const collab = {

    getAllCollab: async () => {
        try {
            let response = await instance.get(`/collabs`);
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    getCollab: async (id: string) => {
        try {
            return await instance.get(`/collab/${id}`)
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

    updateCollab: async (data: any) => {
        try {
            return await instance.put(`/collab/update/${data.id}`, data)
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

    
    photoUpload: async (photo: any) => {
        try {
            return await instance.post(`/photo/`, photo, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        } catch (error) {
            
        }
    },

    createCollab: async (data: any) => {
        try {
            return await instance.post(`collab/create`, data)
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

    deleteCollab: async (id: string) => {
        try {
            return await instance.delete(`collab/del/${id}`)
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

    signin: async (id: number, password: string) => {
        const response = await instance.post('/login/signin', {id, password})
        return response.data;
    },

    signout: async () => {
        const response = await instance.post('/logout')
        return response.data
    }
}