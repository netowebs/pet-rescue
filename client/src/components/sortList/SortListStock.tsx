import moment from "moment"

export const sortAndToggle = (sort: string, a: any, b: any, toggle: boolean) => {
    switch (sort) {
        case 'description':
            if (toggle) {
                return a.description.localeCompare(b.description)
            } else {
                return b.description.localeCompare(a.description)
            }
            case 'id':
                if (toggle) {
                    return a.id.toString() - b.id.toString()
                } else {
                    return b.id.toString() - a.id.toString()
                }
        case 'qtd':
            if (toggle) {
                return a.qtd.toString() - b.qtd.toString()
            } else {
                return b.qtd.toString() - a.qtd.toString()
            }
        case 'validity':
            if (toggle) {
                return moment(a.validity).format('YYYY-MM-DD').localeCompare(moment(b.validity).format('YYYY-MM-DD'))
            } else {
                return moment(b.validity).format('YYYY-MM-DD').localeCompare(moment(a.validity).format('YYYY-MM-DD'))
            }
        case 'sku':
            if (toggle) {
                return a.sku.localeCompare(b.sku)
            } else {
                return b.sku.localeCompare(a.sku)
            }
    }
}