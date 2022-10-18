import { BrandsModel } from './BrandsModel'
import { CategoriesModel } from './CategoriesModel'
import { ItensStockUpdateModel } from './ItensStockUpdateModel'
import { StockUpdateInstance, StockUpdateModel } from './StockUpdateModel'
import {Model, DataTypes, BelongsToManyGetAssociationsMixin, BelongsToManyAddAssociationsMixin} from 'sequelize'
import {sequelize} from '../instances/mysql'

export interface StockInstace extends Model{
    id: number
    description: string
    sku: string
    qtd: number
    validity: Date
    location: string
    cost: number
    unit: string
    obs: string,
    date_cad: Date,
    getStock: BelongsToManyGetAssociationsMixin<StockInstace>
    getUpdate: BelongsToManyGetAssociationsMixin<StockUpdateInstance>
    setStock: BelongsToManyAddAssociationsMixin<StockInstace, StockInstace['id']>
    setUpdate: BelongsToManyAddAssociationsMixin<StockUpdateInstance, StockUpdateInstance['id']>
}

export const StockModel = sequelize.define<StockInstace>("stockModel",{
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

StockUpdateModel.belongsToMany(StockModel, {
    through: {model: ItensStockUpdateModel},
    as: 'Stock',
    foreignKey: 'id_update',
    constraints: true
})

StockModel.belongsToMany(StockUpdateModel, {
    through: {model: ItensStockUpdateModel},
    as: 'Update',
    foreignKey: 'id_product',
    constraints: true
})