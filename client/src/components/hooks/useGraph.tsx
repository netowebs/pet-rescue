import moment from "moment"
import { useEffect, useState } from "react"
import { LctoFinancial } from "../datatableLctoFinancial/list/DatatableLctoFinancial"

export type Graph = {
    monthNum: number
    yearNum: string
    month: string
    credito: number
    debito: number
}


export const useGraph = (listLcto: LctoFinancial[]) => {
    const [dataGraph, setDataGraph] = useState<Graph[]>([])
    moment.updateLocale('pt', {
        months : [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
            "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ]
    });

    useEffect(() => {
        const getList = async () => {
            let newArr = [...dataGraph]
            listLcto.forEach((item: any, index: number) => {
                let idx = newArr.map(item => item.month).indexOf(moment(item.date_lcto).locale('pt-br').format('MMMM/YY'))
                if (idx >= 0) {
                    newArr[idx] = { yearNum: moment(item.date_lcto).format('YYYY-MM'),monthNum: moment(item.date_lcto).month()+1, month: moment(item.date_lcto).locale('pt-br').format('MMMM/YY'), credito: newArr[idx].credito + item.totCredito, debito: newArr[idx].debito + item.totDebito }
                    setDataGraph(newArr)
                } else {
                    newArr = ([...newArr, { yearNum: moment(item.date_lcto).format('YYYY-MM'), monthNum: moment(item.date_lcto).month()+1, month: moment(item.date_lcto).locale('pt-br').format('MMMM/YY'), credito: item.totCredito, debito: item.totDebito }])
                    setDataGraph(newArr)
                }
            })
        }
        getList()
    }, [listLcto.length])

    return {
        dataGraph
    }
}