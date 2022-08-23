import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apartment as apt } from '../../../api/api';
import { Apartment } from '../typeApartment';
import './dtsingle.scss'

let initValue: Apartment

export const ApartmentSingle = () => {

    const params = useParams()

    const [apartment, setApartment] = useState<Apartment>(initValue)

    const loadApartment = async (id: string) => {
        const res = await apt.getApartment(id);
        setApartment(res)
        console.log(apartment)
    }

    useEffect(() => {
        if (params.Id) {
            loadApartment(params.Id)
        }
    }, [])

    return (
        <div className='container-single'>
            
        </div>
    )
}