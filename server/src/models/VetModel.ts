import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'

export interface VetInstance extends Model {
    id: number
    name: string
    crmv: string
    cpf: string
    rg: string
    date_birth: Date
    sex: string
    phone: string
    speciality: string
    address: string
    address_num: string
    district: string
    cep: string
    city: string
    uf: string,
    date_cad: Date

}

export const VetModel = sequelize.define<VetInstance>("VetModel",{
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.NUMBER
    },
    
    name: {
        type: DataTypes.STRING
    },
    crmv: {
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
    speciality: {
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
    }
},
{
    tableName: 'vets',
    timestamps: false
})