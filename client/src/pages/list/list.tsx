import { DatatablePets } from '../../components/datatablePet/DatatablePets'
import { NavBar } from '../../components/navbar/NavBar'
import { SideBar } from '../../components/sidebar/SideBar'
import './list.scss'

import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DatatableTutors } from '../../components/datatableTutors/DatatableTutors';

export const List = () => {  

    const [search, setSearch] = useState('')
    const params = useParams();

    const filterSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    return(
        <div className='list'>
            <SideBar />
            <NavBar />
            <div className="listContainer">
                <div className="internalContainer">
                    <div className="buttonBar">
                        <input className='button' type="submit" value="Novo Cadastro" />
                        <input className='button' type="submit" value="Inativos" />
                    </div>
                    <div className="searchBar">
                        <span>Listagem de 
                            {
                                <span>
                                    {
                                        params.slug === 'pets' &&
                                        "Pet's" ||
                                            params.slug === 'tutors' &&
                                                "Tutores"
                                    }
                                </span>
                            }
                        </span>
                        <div className="searchArea">
                            <input 
                                type="text"
                                onChange={filterSearch}
                                placeholder='Buscar...'/>
                            <LocationSearchingIcon />
                        </div>
                    </div>

                    <div className="cadList">
                        {
                            params.slug === 'pets' &&
                                <DatatablePets search={search}/> ||
                                params.slug === 'tutors' &&
                                <DatatableTutors search={search}/>
                        }   
                        
                    </div>
                </div>
            </div>
        </div>
    )
}