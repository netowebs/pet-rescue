import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'

import {MedicalRecordsModel } from './MedicalRecordsModel'
import { VetsMedicalRecordsModel } from './VetsMedicalRecordsModel'

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
    date_cad: Date,
    user: string
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
    },
    user: {
        type: DataTypes.STRING
    }
},
{
    tableName: 'vets',
    timestamps: false
})

MedicalRecordsModel.belongsToMany(VetModel, {
    through: {model: VetsMedicalRecordsModel},
    as: 'VetMedical',
    foreignKey: 'id_medicalRecords',
    constraints: true
})

VetModel.belongsToMany(MedicalRecordsModel, {
    through: {model: VetsMedicalRecordsModel},
    as: 'MedicalVet',
    foreignKey: 'id_vets',
    constraints: true
})