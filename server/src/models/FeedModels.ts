import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'
import { AnimalModel } from './PetModel'
import { StockModel } from './StockModel'

export interface FeedInstance extends Model {
    id: number
    user: string
    qtdFood: number
    date_cad: Date
}

export const FeedModel = sequelize.define<FeedInstance>("FeedModel",{
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    
    user: {
        type: DataTypes.STRING
    },

    qtdFood: {
        type: DataTypes.NUMBER
    },

    date_cad: {
        type: DataTypes.DATE
    }
},
{
    tableName: 'feed_animals',
    timestamps: false
})

AnimalModel.hasOne(FeedModel,{
    foreignKey: 'id_animal',
    constraints: true
})

StockModel.hasOne(FeedModel, {
    foreignKey: 'id_stock',
    constraints: true
})