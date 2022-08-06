import { petsDb } from "./petsDb";

export type medicalRecord = {
    id: number;
    status: string;
    vet: string;
    pet: {
        id: number;
        name: string;
    }
    dtAtualizacao: string;
}

export const medicalRecordsDb: medicalRecord[]= [
    {
        id: 0,
        status: 'saudável',
        vet: 'Dr. João da Silva',
        pet:{
            id: petsDb[0].id,
            name: petsDb[0].name
        },
        dtAtualizacao: '01/01/2002'
    },

    {
        id: 1,
        status: 'crítico',
        vet: 'Dr. João da Silva',
        pet:{
            id: petsDb[1].id,
            name: petsDb[1].name
        },
        dtAtualizacao:'01/01/2002'
    },

    {
        id: 3,
        status: 'saudável',
        vet: 'Dr. João da Silva',
        pet:{
            id: petsDb[2].id,
            name: petsDb[2].name
        },
        dtAtualizacao:'01/01/2002'
    },

    {
        id: 4,
        status: 'observação',
        vet: 'Dr. João da Silva',
        pet:{
            id: petsDb[3].id,
            name: petsDb[3].name
        },
        dtAtualizacao:'01/01/2002'
    },

    {
        id: 5,
        status: 'saudável',
        vet: 'Dr. João da Silva',
        pet:{
            id: petsDb[4].id,
            name: petsDb[4].name
        },
        dtAtualizacao:'01/01/2002'
    }
]