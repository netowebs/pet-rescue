export const sortAndToggle = (sort: string, a: any, b: any, toggle: boolean) => {
    switch (sort) {
        case 'id':
            if (toggle) {
                return a.id.toString() - b.id.toString()
            } else {
                return b.id.toString() - a.id.toString()
            }
        case 'code_bank':
            if (toggle) {
                return a.code_bank.toString() - b.code_bank.toString()
            } else {
                return b.code_bank.toString() - a.code_bank.toString()
            }
        case 'name_bank':
            if (toggle) {
                return a.name_bank.localeCompare(b.name_bank)
            } else {
                return b.name_bank.localeCompare(a.name_bank)
            }
        case 'user':
            if (toggle) {
                return a.user.localeCompare(b.user)
            } else {
                return b.user.localeCompare(a.user)
            }
        case 'totCredito':
            if (toggle) {
                return a.totCredito.toString() - b.totCredito.toString()
            } else {
                return b.totCredito.toString() - a.totCredito.toString()
            }
        case 'totDebito':
            if (toggle) {
                return a.totDebito.toString() - b.totDebito.toString()
            } else {
                return b.totDebito.toString() - a.totDebito.toString()
            }
        case 'date':
            if (toggle) {
                return a.date_lcto.toString().localeCompare(b.toString().date_lcto)
            } else {
                return b.date_lcto.toString().localeCompare(a.toString().date_lcto)
            }
    }
}