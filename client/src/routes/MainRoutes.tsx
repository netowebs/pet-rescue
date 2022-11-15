import { useRoutes } from "react-router-dom"
import { RequireAuth } from "../contexts/Auth/RequireAuth"
import { Admin } from "../pages/admin/admin"
import { Home } from "../pages/home/home"
import { List } from "../pages/list/list"
import { Login } from "../pages/login/login"
import { New } from "../pages/new/new"
import { Single } from "../pages/single/single"

export const MainRoutes = () => {
    return(
        useRoutes([
            //Rotas Principais
            {path:'/', element:<Login />},
            {path:'/home', element:<RequireAuth><Home /></RequireAuth>},
            //Rotas Genéricas
            {path:'/:slug', element:<RequireAuth><List /></RequireAuth>},
            {path:'/:slug/:Id', element:<RequireAuth><Single /></RequireAuth>},
            {path:'/:slug/new', element:<RequireAuth><New /></RequireAuth>},
            {path:"*", element:'Error'},
            {path:'/cadAdmin', element: <RequireAuth><Admin /></RequireAuth>}
            
        ])
    )
}