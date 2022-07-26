import { useRoutes } from "react-router-dom"
import { Home } from "../pages/home/home"
import { List } from "../pages/list/list"
import { Login } from "../pages/login/login"
import { New } from "../pages/new/new"
import { Single } from "../pages/single/single"

export const MainRoutes = () => {
    return(
        useRoutes([
            //Rotas Principais
            {path:'/', element:<Home />},
            {path:'/login', element:<Login />},
            //Rotas Usuários
            {path:'/users', element:<List />},
            {path:'/users/:userId', element:<Single />},
            {path:'/users/new', element:<New />},
            //Rotas Pets
            {path:'/pets', element:<List />},
            {path:'/pets/:petId', element:<Single />},
            {path:'/pets/new', element:<New />},
            //Rotas Tutores
            {path:'/tutors', element:<List />},
            {path:'/tutors/:tutorId', element:<Single />},
            {path:'/tutors/new', element:<New />},
            //Rotas Colaboradores
            {path:'/collaborators', element:<List />},
            {path:'/collaborators/:collaboratorId', element:<Single />},
            {path:'/collaborators/new', element:<New />},
            //Rotas Colaboradores
            {path:'/collaborators', element:<List />},
            {path:'/collaborators/:collaboratorId', element:<Single />},
            {path:'/collaborators/new', element:<New />},
            //Rotas Fichas Médicas
            {path:'/medicalRecords', element:<List />},
            {path:'/medicalRecords/:medicalRecordId', element:<Single />},
            {path:'/medicalRecords/new', element:<New />},
            //Rotas Adoções
            {path:'/adoptions', element:<List />},
            {path:'/adoptions/:adoptionId', element:<Single />},
            {path:'/adoptions/new', element:<New />},
            
        ])
    )
}