export const sortAndToggle = (sort: string, a: any, b: any, toggle: boolean) => {
    switch (sort) {
        case 'name_bank':
            if (toggle) {
                return a.name_bank.localeCompare(b.name_bank)
            } else {
                return b.name_bank.localeCompare(a.name_bank)
            }
        case 'id':
            if (toggle) {
                return a.id.toString() - b.id.toString()
            } else {
                return b.id.toString() - a.id.toString()
            }
        case 'agency':
            if (toggle) {
                return a.agency.localeCompare(b.agency)
            } else {
                return b.agency.localeCompare(a.agency)
            }
        case 'account':
            if (toggle) {
                return a.account.localeCompare(b.account)
            } else {
                return b.account.localeCompare(a.account)
            }
        case 'balance':
            if (toggle) {
                return a.balance.toString() - b.balance.toString()
            } else {
                return b.balance.toString() - a.balance.toString()
            }

    }
}