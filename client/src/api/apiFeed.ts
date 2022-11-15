import { instance } from "./instance";

export const feed = {

    createFeed: async (data: any) => {
        try {
            return await instance.post(`feed/create`, data)
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