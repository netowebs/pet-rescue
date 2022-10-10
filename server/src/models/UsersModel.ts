import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'
import { CollaboratorsModel } from './CollaboratorsModel'

export interface UsersInstance extends Model {
    id: number
    key: string

}

export const UsersModel = sequelize.define<UsersInstance>("CollaboratorsModel",{
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.NUMBER
    },

    key: {
        type: DataTypes.STRING
    }
},
{
    tableName: 'users',
    timestamps: false
})

UsersModel.belongsTo(CollaboratorsModel,{
    constraints: true,
    foreignKey: 'collaborators_id'
})