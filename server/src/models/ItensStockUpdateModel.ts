import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'

export interface StockUpdateInstance extends Model {
    qtd: number,
    valUnit: number,
    valTot: number
}

export const ItensStockUpdateModel = sequelize.define<StockUpdateInstance>("ItensStockUpdateModel",{
    qtd: {
        type: DataTypes.NUMBER
    },
    valUnit: {
        type: DataTypes.NUMBER
    },
    valTot: {
        type: DataTypes.NUMBER
    }
},
{
    tableName: 'itens_stock_update',
    timestamps: false
})