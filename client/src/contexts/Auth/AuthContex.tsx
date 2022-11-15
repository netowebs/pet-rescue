import {createContext} from 'react'
import { Collaborator } from '../../types/typeCollaborator';

export type AuthContextType = {
    user: Collaborator | null;
    signin: (id: number, password: string) => Promise<boolean>
    signout: () => void
}

export const AuthContext = createContext<AuthContextType>(null!);