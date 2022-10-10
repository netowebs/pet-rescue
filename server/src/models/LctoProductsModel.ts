import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'
import { StockModel } from './StockModel'
import { UsersModel } from './UsersModel'

export interface lctoProductsInstance extends Model {
    id: number,
    date_lcto: Date,
    qtd_itens: number,
    valor_nf: number
}

export const LctoProductsModel = sequelize.define<lctoProductsInstance>("LctoProductsModel",{
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.NUMBER
    },
    
    date_lcto: {
        type: DataTypes.DATE
    },

    qtd_itens: {
        type: DataTypes.NUMBER
    },

    valor_nf: {
        type: DataTypes.NUMBER
    }

},
{
    tableName: 'lcto_Products',
    timestamps: false
})

LctoProductsModel.belongsTo(UsersModel,{
    constraints: true,
    foreignKey: 'users_id'
})

LctoProductsModel.belongsTo(StockModel,{
    constraints: true,
    foreignKey: 'products_id'
})