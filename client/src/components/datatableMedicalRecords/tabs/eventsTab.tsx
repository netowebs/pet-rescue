import moment from 'moment';
import React, { useState } from 'react';
import { EventsList } from '../../../types/typeEventsList';
import { VetList } from '../../../types/typeVetList';
import './eventstab.scss'


type Prop = {
    list: EventsList[]
    vetList: VetList[]
    vetResp: VetList
    setList: React.Dispatch<React.SetStateAction<EventsList[]>>
    user: string
    statusMr: number
}


export const EventsTab = ({ list, vetList, vetResp, setList, user, statusMr }: Prop) => {

    const [date, setDate] = useState(String)
    const [hour, setHour] = useState(String)
    const [event, setEvent] = useState(String)

    const [vetEvent, setVetEvent] = useState(vetResp.name)
    const [userEvent, setUserEvent] = useState(user)

    const defaultInput = () => {
        setDate('')
        setEvent('')
        setHour('')
        setVetEvent(vetResp.name)
    }

    const addEvent = () => {
        if (date.trim() !== '' && hour.trim() !== '' && event.trim() !== '' && vetEvent.trim() !== '') {
            let newArr = ([...list, { date, hour, event, vetEvent, userEvent }])
            setList(newArr)
        } else {
            alert('Preencha todos os campos do evento')
        }
        defaultInput()
    }

    const delEvent = (idx: number) => {
        let newArr = [...list]
        newArr.splice(idx, 1)
        setList(newArr)
    }

    return (
        <div className="itensTab">
            <div className="itensAdd">
                {
                    statusMr !== 1 &&
                    <>
                        <input
                            type="date"
                            className='ipt-dateEvent'
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                        />
                        <input
                            type="time"
                            className='ipt-hourEvent'
                            onChange={(e) => setHour(e.target.value)}
                            value={hour}
                        />
                        <input
                            type="text"
                            className='ipt-descEvent'
                            onChange={(e) => setEvent(e.target.value)}
                            value={event}
                            placeholder={'Descreva a ocorrência...'}
                        />
                        <select
                            name="ipt-vetEvent"
                            id="ipt-vetEvent"
                            value={vetEvent}
                            onChange={(e) => { setVetEvent(e.target.value) }}
                        >
                            <option disabled>Selecione...</option>
                            {
                                vetList.map((item, index) => (
                                    <option
                                        key={index}
                                        value={item.name}
                                    >
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                        <input
                            type="text"
                            className='ipt-userEvent'
                            placeholder='Usuário'
                            value={userEvent}
                            disabled
                        />
                        <button
                            className='btn-insertEvent'
                            onClick={() => addEvent()}
                        >
                            Inserir
                        </button>
                    </>
                }
            </div>
            <table className='eventsList'>
                <thead className='divThead'>
                        <tr className='trHeadEvents'>
                            <th style={{ flex: '0.7' }}>Data</th>
                            <th style={{ flex: '0.5' }}>Hora</th>
                            <th style={{ flex: '2' }}>Ocorrência</th>
                            <th style={{ flex: '1.5' }}>Veterinário</th>
                            <th style={{ flex: '1' }}>Usuário</th>
                        </tr>
                </thead>
                <tbody className='divScroll' style={{ overflowY: 'scroll', height: '213px' }}>
                        {
                            list.map((item, index) => (
                                <tr className='tableRow' key={index}>
                                    <td>
                                        <input
                                            className='tbDate-event'
                                            type="text"
                                            value={moment(item.date).format('DD/MM/YYYY')}
                                            disabled
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className='tbHour-event'
                                            type="text"
                                            value={item.hour.toString()}
                                            disabled
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className='tbDesc-event'
                                            type="text"
                                            value={item.event.toUpperCase()}
                                            disabled
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className='tbVet-event'
                                            type="text"
                                            value={item.vetEvent}
                                            disabled
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className='tbUser-event'
                                            type="text"
                                            value={item.userEvent}
                                            disabled
                                        />
                                    </td>
                                    {
                                        statusMr !== 1 &&
                                        <>
                                            <td>
                                                <input
                                                    className='btnDel-event'
                                                    type="button"
                                                    value="X"
                                                    onClick={() => delEvent(index)}
                                                />
                                            </td>
                                        </>
                                    }

                                </tr>

                            ))
                        }
                </tbody>
            </table>
        </div>
    )
}