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
                return a.qtd.toString().localeCompare(b.qtd.toString())
            } else {
                return b.qtd.toString().localeCompare(a.qtd.toString())
            }
        case 'validity':
            if (toggle) {
                return a.validity.toString().localeCompare(b.validity.toString())
            } else {
                return b.validity.toString().localeCompare(a.validity.toString())
            }
        case 'sku':
            if (toggle) {
                return a.sku.localeCompare(b.sku)
            } else {
                return b.sku.localeCompare(a.sku)
            }
    }
}