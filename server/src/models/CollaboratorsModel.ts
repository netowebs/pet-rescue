import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'

export interface CollaboratorsInstance extends Model {
    id: number
    name: string
    cpf: string
    rg: string
    date_birth: Date
    sex: string
    phone: string
    address: string
    address_num: string
    district: string
    cep: string
    city: string
    uf: string,
    date_cad: Date
    password: string,
    nivel: number
    username: string
    dtAdimission: Date
    cargo: string
    setor: string
    ativo: number
    user: string

}

export const CollaboratorsModel = sequelize.define<CollaboratorsInstance>("CollaboratorsModel",{
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.NUMBER
    },
    
    name: {
        type: DataTypes.STRING
    },
    cpf: {
        type: DataTypes.STRING
    },
    rg: {
        type: DataTypes.STRING
    },
    date_birth: {
        type: DataTypes.DATE
    },
    sex: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    },
    address_num: {
        type: DataTypes.STRING
    },
    district: {
        type: DataTypes.STRING
    },
    cep: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    uf: {
        type: DataTypes.STRING
    },
    date_cad: {
        type: DataTypes.DATE
    },

    password: {
        type: DataTypes.STRING
    },

    nivel: {
        type: DataTypes.NUMBER
    },

    username: {
        type: DataTypes.STRING
    },

    dtAdmission: {
        type: DataTypes.DATE
    },

    cargo: {
        type: DataTypes.STRING
    },

    setor: {
        type: DataTypes.STRING
    },

    ativo: {
        type: DataTypes.NUMBER
    },

    user: {
        type: DataTypes.STRING
    }
},
{
    tableName: 'collaborators',
    timestamps: false
})