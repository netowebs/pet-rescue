import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
      },
})

instance.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('authToken')
    config.headers.Authorization = token ? `Bearer ${token}` : ``
    return config
})