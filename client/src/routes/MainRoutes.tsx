import { useRoutes } from "react-router-dom"
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
            {path:'/', element:<Home />},
            {path:'/login', element:<Login />},
            //Rotas Genéricas
            {path:'/:slug', element:<List />},
            {path:'/:slug/:Id', element:<Single />},
            {path:'/:slug/new', element:<New />},
            {path:"*", element:'Error'},
            {path:'/cadAdmin', element: <Admin />}
            
        ])
    )
}