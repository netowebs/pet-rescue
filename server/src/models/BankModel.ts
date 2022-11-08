import {Model, DataTypes, BelongsToManyAddAssociationsMixin} from 'sequelize'
import {sequelize} from '../instances/mysql'
import { BankLctoModel } from './BankLctoModel'
import { RowsBankLctoModel } from './RowsBankLctoModel'

export interface BankInstance extends Model {
    id: number,
    id_bank: number,
    name_bank: string,
    agency: string,
    account: string
    balance: number
    date_cad: Date
}

export const BankModel = sequelize.define<BankInstance>("BankModel", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_bank: {
        type: DataTypes.INTEGER
    },
    
    date_cad: {
        type: DataTypes.DATE
    },
    name_bank:{
        type: DataTypes.STRING
    },
    agency:{
        type: DataTypes.STRING
    },
    account:{
        type: DataTypes.STRING
    },
    balance:{
        type: DataTypes.NUMBER
    },
    tot_creditos: {
        type: DataTypes.NUMBER
    },
    tot_debitos: {
        type: DataTypes.NUMBER
    }
},{
    tableName: 'banks',
    timestamps: false
}
)
