import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'
import { BrandsModel } from './BrandsModel'
import { CategoriesModel } from './CategoriesModel'

export interface StockInstance extends Model {
    id: number
    description: string
    sku: string
    qtd: number
    validity: Date
    location: string
    cost: number
    unit: string
    obs: string,
    date_cad: Date
}

export const StockModel = sequelize.define<StockInstance>("StockModel",{
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.NUMBER
    },
    
    description: {
        type: DataTypes.STRING
    },
    sku: {
        type: DataTypes.STRING
    },
    qtd: {
        type: DataTypes.NUMBER
    },
    validity: {
        type: DataTypes.DATE
    },
    location: {
        type: DataTypes.STRING
    },
    cost: {
        type: DataTypes.NUMBER
    },
    unit: {
        type: DataTypes.STRING
    },
    obs: {
        type: DataTypes.STRING
    },
    date_cad: {
        type: DataTypes.DATE
    }

},
{
    tableName: 'products',
    timestamps: false
})

StockModel.belongsTo(CategoriesModel,{
    constraints: true,
    foreignKey: 'categories_id'
})

StockModel.belongsTo(BrandsModel,{
    constraints: true,
    foreignKey: 'brands_id'
})