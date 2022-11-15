import moment from 'moment';
import { useEffect, useState } from 'react';
import { LineChart, Line, Legend, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { lctoFinancial } from '../../../../api/apiLctoFinancial';
import { LctoFinancial } from '../../../datatableLctoFinancial/list/DatatableLctoFinancial';
import { Graph, useGraph } from '../../../hooks/useGraph';

export const Chart = () => {

  const [listLcto, setListLcto] = useState<LctoFinancial[]>([])
  const [dataInicio, setDataInicio] = useState(String)
  const [dataFim, setDataFim] = useState(String)
  const [dataInicioConvert, setDataInicioConvert] = useState(String)
  const [dataFimConvert, setDataFimConvert] = useState(String)
  const [personalGraph, setPersonalGraph] = useState<Graph[]>([])
 
  useEffect(() => {
    const getList = async () => {
      let json = await lctoFinancial.getAllLcto()
      if (json.success) {
        setListLcto(json.data)
      }
    }
    getList()
  }, [])

  const handleGraph = () => {
    let newArr = dataGraph.filter(item => item.yearNum >= dataInicio && item.yearNum <=dataFim)
    setPersonalGraph(newArr)
  }

  const convertDate = (dateString: string) => {
    let date =  new Date(moment(dateString).format('MMM/YYYY'))
    let ano = date.getFullYear()
    let mes = date.getMonth()+1
    return `${mes}/${ano}`
}

  useEffect(() => {
    setDataInicioConvert(moment(dataInicio).format('MM'))
    setDataFimConvert(moment(dataFim).format('MM'))
    handleGraph()
  },[dataInicioConvert, dataFimConvert,dataInicio, dataFim])

  const { dataGraph } = useGraph(listLcto)

  return (
    <div className="container-chart">
      <div className="topHandle" style={{ display: 'flex'}}>
        <div className="text" style={{flex: '1', display: 'flex'}}>
          <p style={{marginRight: '30px', color: '#ad2a2a'}}>Gráfico Financeiro</p>
          <p style={{ textAlign: 'right', color: '#16a685', marginRight: '10px'}}>Filtro:</p>
        </div>
        <div className="handle" style={{flex: '2', display: 'flex'}}>
          <input
            type="month"
            name=""
            id="" 
            max={dataFim}
            onChange={(e) => setDataInicio(e.target.value)}
            //onMouseLeave={() => setDataFim(dataInicio)}
            defaultValue={dataInicio}
          />
          <p style={{marginLeft: '10px', marginRight: '10px'}}> até </p>
          <input
            type="month"
            name="" 
            id=""
            min={dataInicio}
            defaultValue={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            disabled={dataInicio === '' ? true : false}
          />
        </div>
      </div>
      <LineChart
        width={622}
        height={250}
        data={dataInicio === '' ? (dataGraph.sort(function (a, b) {
          return a.yearNum.localeCompare(b.yearNum)
        })): (personalGraph.sort(function (a, b) {
          return a.yearNum.localeCompare(b.yearNum)
        }))}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
          <Line type="monotone" dataKey="credito" stroke="#16a685" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="debito" stroke="#ad2a2a" />
        {/* <Area type="monotone" dataKey="credito" stackId="1" stroke="" fill="#3ae0ba" />
        <Area type="monotone" dataKey="debito" stackId="1" stroke="#ad2a2a" fill="#e36464" /> */}
      </LineChart>
    </div>

  )
}