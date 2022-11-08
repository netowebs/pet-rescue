export const sortAndToggle = (sort: string, a: any, b: any, toggle: boolean) => {
    switch (sort) {
        case 'nf':
            if (toggle) {
                return a.nf.localeCompare(b.nf)
            } else {
                return b.nf.localeCompare(a.nf)
            }
        case 'id':
            if (toggle) {
                return a.id.toString() - b.id.toString()
            } else {
                return b.id.toString() - a.id.toString()
            }
        case 'provider':
            if (toggle) {
                return a.provider.localeCompare(b.provider)
            } else {
                return b.provider.localeCompare(a.provider)
            }
        case 'amount':
            if (toggle) {
                return a.amount.toString() - b.amount.toString()
            } else {
                return b.amount.toString() - a.amount.toString()
            }
        case 'source':
            if (toggle) {
                return a.source.localeCompare(b.source)
            } else {
                return b.source.localeCompare(a.source)
            }
        case 'user':
            if (toggle) {
                return a.user.localeCompare(b.user)
            } else {
                return b.user.localeCompare(a.user)
            }
        case 'date':
            if (toggle) {
                return a.date.toString().localeCompare(b.toString().date)
            } else {
                return b.date.toString().localeCompare(a.toString().date)
            }
    }
}