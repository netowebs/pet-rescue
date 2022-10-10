export const sortAndToggle = (sort: string, a: any, b: any, toggle: boolean) => {
    switch (sort) {
        case 'name':
            if (toggle) {
                return a.name.localeCompare(b.name)
            } else {
                return b.name.localeCompare(a.name)
            }
        case 'id':
            if (toggle) {
                return a.id.toString().localeCompare(b.id.toString())
            } else {
                return b.id.toString().localeCompare(a.id.toString())
            }
        case 'crmv':
            if (toggle) {
                return a.crmv.localeCompare(b.crmv)
            } else {
                return b.crmv.localeCompare(a.crmv)
            }
        case 'speciality':
            if (toggle) {
                return a.speciality.localeCompare(b.speciality)
            } else {
                return b.speciality.localeCompare(a.speciality)
            }
        case 'address':
            if (toggle) {
                return a.address.localeCompare(b.address)
            } else {
                return b.address.localeCompare(a.address)
            }
        case 'phone':
            if (toggle) {
                return a.phone.localeCompare(b.phone)
            } else {
                return b.phone.localeCompare(a.phone)
            }
    }
}