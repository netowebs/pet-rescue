import { Link } from "react-router-dom"

export const Calendar = () => {
    return(
        <div className="container-calendar">
            <Link to={'/apartments'}>
                <button>Listar Apartamentos</button>
            </Link>
        </div>
    )
}