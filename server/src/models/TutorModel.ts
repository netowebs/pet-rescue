import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'
import { AnimalModel } from './PetModel'

export interface TutorInstance extends Model {
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
    uf: string
    date_cad: Date

}

export const TutorModel = sequelize.define<TutorInstance>("TutorModel",{
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
    }
},
{
    tableName: 'tutors',
    timestamps: false
})

TutorModel.belongsTo(AnimalModel,{
    constraints: true,
    foreignKey: 'animals_id'
})