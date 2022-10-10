import { NavBar } from '../../components/navbar/NavBar'
import { SideBar } from '../../components/sidebar/SideBar'
import './list.scss'

import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DatatableMedicalRecords } from '../../components/datatableMedicalRecords/DatatableMedicalRecords';
import { DatatablePets } from '../../components/datatablePet/list/DatatablePets';
import { pdfListPet } from '../../components/relatorios/pdfPets/listPet/pdfListPet'
import { DatatableVets } from '../../components/datatableVet/list/DatatableVet';
import { DatatableTutors } from '../../components/datatableTutors/list/DatatableTutors';
import { DatatableStock } from '../../components/datatableStock/list/DatatableStock';
import { DatatableLcto } from '../../components/datatableLcto/list/DatatableLcto';

export const List = () => {

    const [search, setSearch] = useState('')
    const params = useParams();

    const filterSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    return (
        <div className='list'>
            <SideBar />
            <NavBar />
            <div className="listContainer">
                <div className="internalContainer">
                    <div className="buttonBar">
                        <Link className='btnNew' to={`/${params.slug}/new`}>
                            <input className='button' type="submit" value="Novo Cadastro" />
                        </Link>
                        <input
                            className='btnPdf'
                            type="submit"
                            value="Relatório"
                            onClick={pdfListPet}
                        />
                        {
                            params.slug === 'stock' &&
                            <Link className='btnNew' to={`/lcto`}>
                                <input className='button' type="submit" value="Lançamentos" />
                            </Link>
                        }
                    </div>
                    <div className="searchBar">
                        <span>Listagem de
                            {
                                <span>
                                    {
                                        params.slug === 'pets' &&
                                        "Pet's" ||
                                        params.slug === 'tutors' &&
                                        "Tutores" ||
                                        params.slug === 'medical-records' &&
                                        "Fichas Médicas" ||
                                        params.slug === `financial` &&
                                        `Lançamentos Financeiros` ||
                                        params.slug === 'vets' &&
                                        'Veterinários' ||
                                        params.slug === 'stock' &&
                                        'Estoque' ||
                                        params.slug === 'lcto' &&
                                        'Lançamentos de Estoque'
                                    }
                                </span>
                            }
                        </span>
                        <div className="searchArea">
                            <input
                                type="text"
                                onChange={filterSearch}
                                value={search}
                                placeholder='Buscar...' />
                            <LocationSearchingIcon />
                        </div>
                    </div>

                    <div className="cadList">
                        {
                            params.slug === 'pets' &&
                            <DatatablePets search={search} setSearch={setSearch} /> ||
                            params.slug === 'tutors' &&
                            <DatatableTutors search={search} setSearch={setSearch} /> ||
                            params.slug === 'medical-records' &&
                            <DatatableMedicalRecords search={search} setSearch={setSearch} /> ||
                            params.slug === 'vets' &&
                            <DatatableVets search={search} setSearch={setSearch} /> ||
                            params.slug === 'stock' &&
                            <DatatableStock search={search} setSearch={setSearch} /> ||
                            params.slug === 'lcto' &&
                            <DatatableLcto search={search} setSearch={setSearch} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}