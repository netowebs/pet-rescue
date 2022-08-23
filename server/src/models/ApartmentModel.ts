import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'
import {SectionModel} from './SectionModel'

export interface ApartmentInstance extends Model {
    id: number,
    name: string,
    section: number
}

export const ApartmentModel = sequelize.define<ApartmentInstance>("ApartmentModel", {
    id: {
        primaryKey: true,
        type: DataTypes.NUMBER
    },
    name: {
        type: DataTypes.STRING   
    }
},
{
    tableName: 'apartment',
    timestamps: false
})

ApartmentModel.belongsTo(SectionModel,{
    constraints: true,
    foreignKey: 'section_id'
})