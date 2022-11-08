import { NavBar } from '../../components/navbar/NavBar'
import { SideBar } from '../../components/sidebar/SideBar'
import './list.scss'

import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DatatablePets } from '../../components/datatablePet/list/DatatablePets';
import { pdfListPet } from '../../components/relatorios/pdfPets/listPet/pdfListPet'
import { DatatableVets } from '../../components/datatableVet/list/DatatableVet';
import { DatatableTutors } from '../../components/datatableTutors/list/DatatableTutors';
import { DatatableStock } from '../../components/datatableStock/list/DatatableStock';
import { DatatableLcto } from '../../components/datatableLcto/list/DatatableLcto';
import { DatatableMedicalRecords } from '../../components/datatableMedicalRecords/list/DatatableMedicalRecords';
import { DatatableMedicalClosed } from '../../components/datatableMedicalRecords/closed/DatatableMedicalClosed';
import { DatatableBank } from '../../components/datatableBank/list/DatatableBank';
import { DatatableLctoFinancial } from '../../components/datatableLctoFinancial/list/DatatableLctoFinancial';
import { DatatableAdoptions } from '../../components/datatableAdoptions/list/DatatableAdoptions';
import { DatatablePetsAdopteds } from '../../components/datatablePet/adopteds/DatatablePetsAdopteds';

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
                        <Link className='btnNew' to={`/${params.slug !== 'medical-closed'? params.slug : 'medical-records'}/new`}>
                            <input className='button' type="submit" value="Novo Cadastro" />
                        </Link>
                        {/* <input
                            className='btnPdf'
                            type="submit"
                            value="Relatório"
                            onClick={pdfListPet}
                        /> */}
                        {
                            params.slug === 'stock' &&
                            <Link className='btnNew' to={`/lctos`}>
                                <input className='button' type="submit" value="Lançamentos" />
                            </Link>
                        }

                        {
                            params.slug === 'lctos' &&
                            <Link className='btnNew' to={`/stock`}>
                                <input className='button' type="submit" value="Estoque" />
                            </Link>
                        }
                        {
                            params.slug === 'medical-records' &&
                            <Link className='btnClosedLink' to={`/medical-closed`}>
                                <input className='button' type="submit" value="Baixados" />
                            </Link>
                        }
                        {
                            params.slug === 'medical-closed' &&
                            <Link className='btnMedicalRecords' to={`/medical-records`}>
                                <input className='button' type="submit" value="Abertas" />
                            </Link>
                        }
                        {
                            params.slug === 'pets' &&
                            <Link className='btnAdopted' to={`/adopted`}>
                                <input className='button' type="submit" value="Adotados" />
                            </Link>
                        }
                        {
                            params.slug === 'adopted' &&
                            <Link className='btnAdopted' to={`/pets`}>
                                <input className='button' type="submit" value="Disponiveis" />
                            </Link>
                        }
                    </div>
                    <div className="searchBar">
                        <span>Listagem de
                            {
                                <span>
                                    {
                                        params.slug === 'pets' &&
                                        "Animais" ||
                                        params.slug === 'tutors' &&
                                        "Tutores" ||
                                        params.slug === 'medical-records' &&
                                        "Fichas Médicas" ||
                                        params.slug === 'medical-closed' &&
                                        "Fichas Médicas Baixadas" ||
                                        params.slug === `financial` &&
                                        `Lançamentos Financeiros` ||
                                        params.slug === 'vets' &&
                                        'Veterinários' ||
                                        params.slug === 'stock' &&
                                        'Estoque' ||
                                        params.slug === 'lctos' &&
                                        'Lançamentos de Estoque' ||
                                        params.slug === 'bank' &&
                                        'Caixas e Bancos' ||
                                        params.slug === 'adoptions' &&
                                        'Adoção' ||
                                        params.slug === 'adopted' &&
                                        'Animais Adotados'
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
                            params.slug === 'medical-closed' &&
                            <DatatableMedicalClosed search={search} setSearch={setSearch} /> ||
                            params.slug === 'vets' &&
                            <DatatableVets search={search} setSearch={setSearch} /> ||
                            params.slug === 'stock' &&
                            <DatatableStock search={search} setSearch={setSearch} /> ||
                            params.slug === 'lctos' &&
                            <DatatableLcto search={search} setSearch={setSearch} /> ||
                            params.slug === 'bank' &&
                            <DatatableBank search={search} setSearch={setSearch} /> ||
                            params.slug === 'financial' &&
                            <DatatableLctoFinancial search={search} setSearch={setSearch} /> ||
                            params.slug === 'adoptions' &&
                            <DatatableAdoptions search={search} setSearch={setSearch} /> ||
                            params.slug === 'adopted' &&
                            <DatatablePetsAdopteds search={search} setSearch={setSearch} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}