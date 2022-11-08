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
                return a.id.toString() - b.id.toString()
            } else {
                return b.id.toString() - a.id.toString()
            }
        case 'address':
            if(toggle) {
                return a.address.localeCompare(b.address)
            }else{
                return b.address.localeCompare(a.address)
            }
        case 'phone':
            if(toggle) {
                return a.phone.localeCompare(b.phone)
            }else{
                return b.phone.localeCompare(a.phone)
            }
        case 'cpf':
            if(toggle) {
                return a.cpf.localeCompare(b.cpf)
            }else{
                return b.cpf.localeCompare(a.cpf)
            }
        case 'rg':
            if(toggle) {
                return a.rg.localeCompare(b.rg)
            }else{
                return b.rg.localeCompare(a.rg)
            }
    }
}