import { BelongsToManyAddAssociationMixin, Model, DataTypes } from 'sequelize'
import {sequelize} from '../instances/mysql'

import {AnimalModel} from './PetModel'
import { VetInstance } from './VetModel'

export interface MedicalRecordsInstace extends Model {
    id: number
    date: Date
    user: string
    status: string
    last_change: Date
    obs: string
    addVetMedical: BelongsToManyAddAssociationMixin<VetInstance, VetInstance['id']>
    statusMR: number
}

export const MedicalRecordsModel = sequelize.define<MedicalRecordsInstace>("medicalRecordsModel",{
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.NUMBER
    },
    
    date: {
        type: DataTypes.DATE
    },
    
    user: {
        type: DataTypes.STRING
    },

    status: {
        type: DataTypes.STRING
    },

    obs: {
        type: DataTypes.STRING
    },

    last_change: {
        type: DataTypes.DATE
    },

    events: {
        type: DataTypes.JSON
    },

    itens: {
        type: DataTypes.JSON
    },

    animal_name: {
        type: DataTypes.JSON
    },

    vet_name: {
        type: DataTypes.STRING
    },

    statusMR: {
        type: DataTypes.NUMBER
    }
},
{
    tableName: 'handbook',
    timestamps: false
})

MedicalRecordsModel.belongsTo(AnimalModel, {
    foreignKey: 'animals_id',
    constraints: true
})