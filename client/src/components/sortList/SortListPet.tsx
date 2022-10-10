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
        case 'dtRescue':
            if (toggle) {
                return a.date_rescue.localeCompare(b.date_rescue)
            } else {
                return b.date_rescue.localeCompare(a.date_rescue)
            }
        case 'species':
            if (toggle) {
                return a.species.localeCompare(b.species)
            } else {
                return b.species.localeCompare(a.species)
            }
        case 'status':
            if (toggle) {
                return a.status.localeCompare(b.status)
            } else {
                return b.status.localeCompare(a.status)
            }
        case 'temperament':
            if (toggle) {
                return a.temperament.localeCompare(b.temperament)
            } else {
                return b.temperament.localeCompare(a.temperament)
            }
        case 'age':
            if (toggle) {
                return a.age_approx.toString().localeCompare(b.age_approx.toString())
            } else {
                return b.age_approx.toString().localeCompare(a.age_approx.toString())
            }
        case 'sex':
            if (toggle) {
                return a.sex.localeCompare(b.sex)
            } else {
                return b.sex.localeCompare(a.sex)
            }
    }
}