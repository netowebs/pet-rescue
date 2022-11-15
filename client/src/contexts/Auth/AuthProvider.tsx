import { useState, useEffect } from 'react'
import { collab } from '../../api/apiCollab'
import { instance } from '../../api/instance'
import { Collaborator } from '../../types/typeCollaborator'
import { AuthContext } from "./AuthContex"

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

    const [user, setUser] = useState<Collaborator | null>(null)

    useEffect(() => {
        const validadeToken = async () => {
            const storageData = localStorage.getItem('authToken')
            const storageUser = localStorage.getItem('user_db')
            if (storageData) {
                try {
                    instance.defaults.headers.common['Authorization'] = `Bearer ${storageData}`
                    setUser(JSON.parse(String(storageUser)))
                } catch (error) {
                    
                }
            }
        }
        validadeToken()
    }, [])

    const signin = async (id: number, password: string) => {
        const json = await collab.signin(id, password)
        if (json.id && json.token) {
            setUser(json)
            setToken(json.token)
            localStorage.setItem('user_db', JSON.stringify(json))
            return true
        } else {
            return false
        }
    }

    const signout = async () => {
        setToken('')
        setUser(null)
        
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token)
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
}

