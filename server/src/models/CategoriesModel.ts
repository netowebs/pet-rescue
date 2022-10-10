import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'

export interface CategoriesInstance extends Model {
    id: number
    description: string
}

export const CategoriesModel = sequelize.define<CategoriesInstance>("CategoriesModel",{
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.NUMBER
    },
    
    description: {
        type: DataTypes.STRING
    }
},
{
    tableName: 'categories',
    timestamps: false
})