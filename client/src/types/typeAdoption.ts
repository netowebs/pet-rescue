import { Pet } from "./typePet"
import { Tutor } from "./typeTutor"

export type Adoption = {
    id: number,
    obs: string,
    user: string,
    AnimalModel: Pet,
    TutorModel: Tutor,
    date: Date
}