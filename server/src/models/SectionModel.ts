import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'

export interface SectionInstance extends Model {
    id: number,
    name: string
}

export const SectionModel = sequelize.define<SectionInstance>("SectionModel",{
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.NUMBER
    },
    
    name: {
        type: DataTypes.STRING
    }
},
{
    tableName: 'section',
    timestamps: false
})