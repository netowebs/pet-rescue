import moment from "moment"

export const sortAndToggle = (sort: string, a: any, b: any, toggle: boolean) => {
    switch (sort) {
        case 'id':
            if (toggle) {
                return a.id.toString() - b.id.toString()
            } else {
                return b.id.toString() - a.id.toString()
            }
        case 'status':
            if (toggle) {
                return b.status.localeCompare(a.status)
            } else {
                return a.status.localeCompare(b.status)
            }
        case 'vet':
            if (toggle) {
                return a.vet_name.localeCompare(b.vet_name)
            } else {
                return b.vet_name.localeCompare(a.vet_name)
            }
        case 'pet':
            if (toggle) {
                return a.animal_name.localeCompare(b.animal_name)
            } else {
                return b.animal_name.localeCompare(a.animal_name)
            }
        case 'last':
            if (toggle) {
                return moment(a.last_change).format('YYYY-MM-DD').localeCompare(moment(b.last_change).format('YYYY-MM-DD'))
            } else {
                return moment(b.last_change).format('YYYY-MM-DD').localeCompare(moment(a.last_change).format('YYYY-MM-DD'))
            }
    }
}