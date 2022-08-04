export type medicalRecord = {
    id: number;
    status: string;
    vet: string;
    pet:{
        id: number;
        name: string;
    };
    dtAtualizacao: string;
}

export const medicalRecordsDb: medicalRecord[]= [
    {
        id: 0,
        status: 'saudável',
        vet: 'Dr. João da Silva',
        pet:{
            id: 1311,
            name: 'Sultão'
        },
        dtAtualizacao: '01/01/2002'
    },

    {
        id: 1,
        status: 'crítico',
        vet: 'Dr. João da Silva',
        pet:{
            id: 1132,
            name: 'Nala'
        },
        dtAtualizacao:'01/01/2002'
    },

    {
        id: 3,
        status: 'saudável',
        vet: 'Dr. João da Silva',
        pet:{
            id: 1112,
            name: 'Apolo'
        },
        dtAtualizacao:'01/01/2002'
    },

    {
        id: 4,
        status: 'observação',
        vet: 'Dr. João da Silva',
        pet:{
            id: 4345,
            name: 'Frederico'
        },
        dtAtualizacao:'01/01/2002'
    },

    {
        id: 5,
        status: 'saudável',
        vet: 'Dr. João da Silva',
        pet:{
            id: 8932,
            name: 'Chico'
        },
        dtAtualizacao:'01/01/2002'
    }
]