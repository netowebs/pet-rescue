import { Datatable } from '../../components/datatable/Datatable'
import { NavBar } from '../../components/navbar/NavBar'
import { SideBar } from '../../components/sidebar/SideBar'
import './list.scss'

import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import React, { useState } from 'react';
import { Pet } from '../../bdfake/petsDb';
export const List = () => {  

    const [loadingList, setLoadingList] = useState<Pet[]>([])
    const [nameSearch, setNameSearch] = useState(String)

    const filter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = event.target.value;

        if(keyword !== ''){
            const results = loadingList.filter((item) => {
                return item.name.toLocaleLowerCase().startsWith(keyword.toLowerCase());
            });
            setLoadingList(results)
        }else{
            setLoadingList(loadingList)
        }

        setNameSearch(keyword);
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
                        <span>Listagem de Pet's</span>
                        <div className="searchArea">
                            <input 
                                type="text" 
                                value={nameSearch}
                                onChange={filter}
                                placeholder='Buscar...'/>
                            <LocationSearchingIcon />
                        </div>
                    </div>
                    <div className="titleBar">
                        <div className="idPet-title">ID</div>
                        <div className="namePet-title">Nome</div>
                        <div className="dtCad-title">Data Cadastro</div>
                        <div className="zonePet-title">Zona</div>
                        <div className="sectionPet-title">Seção</div>
                        <div className="apartmentPet-title">Apartamento</div>
                    </div>
                    <div className="cadList">
                        <Datatable />
                    </div>
                </div>
            </div>
        </div>
    )
}
