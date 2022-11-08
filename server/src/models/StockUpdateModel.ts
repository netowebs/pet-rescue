import {Model, DataTypes, BelongsToManyGetAssociationsMixin, BelongsToManyAddAssociationsMixin} from 'sequelize'
import {sequelize} from '../instances/mysql'
import { StockInstace } from './StockModel'

export interface StockUpdateInstance extends Model {
    id: number,
    date: Date,
    nf: number,
    qtd_itens: number,
    amount: number,
    donation: number,
    provider: string,
    user: string,
    withdraw: string
    getStock: BelongsToManyGetAssociationsMixin<StockInstace>
    getUpdate: BelongsToManyGetAssociationsMixin<StockUpdateInstance>
    setStock: BelongsToManyAddAssociationsMixin<StockInstace, StockInstace['id']>
    setUpdate: BelongsToManyAddAssociationsMixin<StockUpdateInstance, StockUpdateInstance['id']>
}

export const StockUpdateModel = sequelize.define<StockUpdateInstance>("stockUpdateModel",{
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.NUMBER
    },
    
    date: {
        type: DataTypes.DATE
    },
    nf: {
        type: DataTypes.NUMBER
    },
    qtd_itens: {
        type: DataTypes.NUMBER
    },
    amount: {
        type: DataTypes.NUMBER
    },
    donation: {
        type: DataTypes.NUMBER
    },
    provider: {
        type: DataTypes.STRING
    },
    user: {
        type: DataTypes.STRING
    },
    withdraw: {
        type: DataTypes.STRING
    }
},
{
    tableName: 'stock_update',
    timestamps: false
})