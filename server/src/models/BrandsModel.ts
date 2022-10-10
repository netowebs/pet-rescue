import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'

export interface BrandsInstance extends Model {
    id: number
    name: string
}

export const BrandsModel = sequelize.define<BrandsInstance>("BrandsModel",{
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
    tableName: 'brands',
    timestamps: false
})