import moment from "moment"

export const sortAndToggle = (sort: string, a: any, b: any, toggle: boolean) => {
    switch (sort) {
        case 'pet':
            if (toggle) {
                return a.AnimalModel?.name.localeCompare(b.AnimalModel?.name)
            } else {
                return b.AnimalModel?.name.localeCompare(a.AnimalModel?.name)
            }
        case 'tutor':
            if (toggle) {
                return a.TutorModel?.name.localeCompare(b.TutorModel?.name)
            } else {
                return b.TutorModel?.name.localeCompare(a.TutorModel?.name)
            }
        case 'id':
            if (toggle) {
                return a.id.toString() - b.id.toString()
            } else {
                return b.id.toString() - a.id.toString()
            }
        case 'dtAdoption':
            if (toggle) {
                return moment(a.date).format('YYYY-MM-DD').localeCompare(moment(b.date).format('YYYY-MM-DD'))
            } else {
                return moment(b.date).format('YYYY-MM-DD').localeCompare(moment(a.date).format('YYYY-MM-DD'))
            }
        case 'user':
            if (toggle) {
                return a.user.localeCompare(b.user)
            } else {
                return b.user.localeCompare(a.user)
            }
    }
}