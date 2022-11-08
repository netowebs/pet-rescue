export type MedicalRecord = {
    id: number,
    user: string,
    date: string,
    animals_id: number,
    animal_name: string,
    vet_name:string
    status: string,
    obs: string,
    last_change: string,
    ItensList: JSON
    events: JSON
    vet_id: number

}