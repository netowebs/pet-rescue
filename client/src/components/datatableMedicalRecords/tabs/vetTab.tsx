import React, { useEffect, useState } from 'react';
import { vet } from '../../../api/apiVet';
import { ItensList } from '../../../types/typeItensList';
import { VetList } from '../../../types/typeVetList';
import './vettab.scss'

type Prop = {
    list: VetList[]
    vetResp: VetList
    setList: React.Dispatch<React.SetStateAction<VetList[]>>
    listItens: ItensList[]
    setIdVets: React.Dispatch<React.SetStateAction<number[]>>
    idVets: number[]
    statusMr: number
}

export const VetTab = ({ list, vetResp, listItens, setList, setIdVets, idVets, statusMr }: Prop) => {

    const [vetId, setVetId] = useState(Number)
    const [vetName, setVetName] = useState(String)
    const [vetPhone, setVetPhone] = useState(String)
    const [vetCrmv, setVetCrmv] = useState(String)
    const [vetSpeciality, setVetSpeciality] = useState(String)

    const getVet = async (id: number) => {
        let json = await vet.getVet(id.toString())
        if (json.success) {
            setVetName(json.data.name)
            setVetPhone(json.data.phone)
            setVetCrmv(json.data.crmv)
            setVetSpeciality(json.data.speciality)
        } else if (vetId !== 0) {
            alert('Veterinário não encontrado')
            setVetId(0)
            setVetName('')
            setVetCrmv('')
            setVetSpeciality('')
        }
    }
    const addVet = (id: number) => {
        let index = list.map(item => item.id).indexOf(id)
        if (id) {
            if (index > -1 || vetId === vetResp.id) {
                alert('Veterinário já consta na listagem ou é o responsável pela ficha médica')
            } else {
                let newArr = ([...list, { id: vetId, name: vetName, crmv: vetCrmv, speciality: vetSpeciality, phone: vetPhone }])
                setList(newArr)
                let newIds = ([...newArr.map(item => item.id)])
                setIdVets(newIds)
            }
            setVetId(0)
            setVetName('')
            setVetCrmv('')
            setVetSpeciality('')
        } else {
            alert('Informe o ID do veterinário')
        }
    }

    useEffect(() => {
        setIdVets([...list.map(item => item.id)])
    }, [])

    const delVet = (idx: number, nameVet: string) => {
        let index = listItens.map(item => item.vetProduct).indexOf(nameVet)
        if (idx === 0 || index > -1) {
            alert('Veterinário com item lançado ou veterinário responsável, não pode ser removido')
        } else {
            let newArr = [...list]
            newArr.splice(idx, 1)
            setList(newArr)
            let arrIdVets = [...idVets]
            arrIdVets.splice(idx, 1)
            setIdVets(arrIdVets)
        }
    }

    return (
        <div className="vetTab">
            <div className="vetAdd">
                {
                    statusMr !== 1 &&
                    <>
                        <input
                            type="text"
                            className='ipt-vetId'
                            onChange={(e) => setVetId(parseInt(e.target.value))}
                            onBlur={() => getVet(vetId)}
                            value={vetId}
                            placeholder={'Código...'}
                        />
                        <input
                            type="text"
                            className='ipt-vetName'
                            placeholder='Nome Completo'
                            defaultValue={vetName}
                            disabled
                        />
                        <input
                            type="text"
                            className='ipt-vetCrmv'
                            defaultValue={vetCrmv}
                            placeholder={'CRMV'}
                            disabled
                        />
                        <input
                            type="text"
                            className='ipt-vetSpeciality'
                            placeholder='Especialidade'
                            defaultValue={vetSpeciality}
                            disabled
                        />
                        <button
                            className='btn-insertVet'
                            onClick={() => addVet(vetId)}
                        >
                            Inserir
                        </button>
                    </>
                }
            </div>
            <table className='vetList'>
                <thead>
                    <tr className='trHeadVet'>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>CRMV</th>
                        <th>Espcialidade</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((item, index) => (
                            <tr className='tableRow' key={index}>
                                <td>
                                    <input
                                        className='tbId-vet'
                                        type="text"
                                        value={item.id}
                                        disabled
                                    />
                                </td>
                                <td>
                                    <input
                                        className='tbName-vet'
                                        type="text"
                                        value={item.name}
                                        disabled
                                    />
                                </td>
                                <td>
                                    <input
                                        className='tbPhone-vet'
                                        type="text"
                                        value={item.phone}
                                        disabled
                                    />
                                </td>
                                <td>
                                    <input
                                        className='tbCrmv-vet'
                                        type="text"
                                        value={item.crmv}
                                        disabled
                                    />
                                </td>
                                <td>
                                    <input
                                        className='tbSpeciality-vet'
                                        type="text"
                                        value={item.speciality}
                                        disabled
                                    />
                                </td>
                                {
                                    statusMr !== 1 &&
                                    <td>
                                        <input
                                            className='btnDel-vet'
                                            type="button"
                                            value="X"
                                            onClick={() => delVet(index, item.name)}
                                        />
                                    </td>
                                }
                            </tr>

                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}