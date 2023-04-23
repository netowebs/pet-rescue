import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
      },
})

instance.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('authToken')
    config.headers.Authorization = token ? `Bearer ${token}` : ``
    return config
})
