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
                return a.id.toString().localeCompare(b.id.toString())
            } else {
                return b.id.toString().localeCompare(a.id.toString())
            }
        case 'qtd':
            if (toggle) {
                return a.qtd.localeCompare(b.qtd)
            } else {
                return b.qtd.localeCompare(a.qtd)
            }
        case 'validity':
            if (toggle) {
                return a.validity.localeCompare(b.validity)
            } else {
                return b.validity.localeCompare(a.validity)
            }
        case 'sku':
            if (toggle) {
                return a.sku.localeCompare(b.sku)
            } else {
                return b.sku.localeCompare(a.sku)
            }
    }
}