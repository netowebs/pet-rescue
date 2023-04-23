import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://backpetrescue.up.railway.app/',
    headers: {
        'Content-Type': 'application/json',
      },
})

instance.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('authToken')
    config.headers.Authorization = token ? `Bearer ${token}` : ``
    return config
})
