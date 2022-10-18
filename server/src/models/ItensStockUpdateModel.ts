import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'
import { StockUpdateModel } from './StockUpdateModel'

export interface StockUpdateInstance extends Model {
    
}

export const ItensStockUpdateModel = sequelize.define<StockUpdateInstance>("ItensStockUpdateModel",{
    
},
{
    tableName: 'itens_stock_update',
    timestamps: false
})