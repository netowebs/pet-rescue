import { BelongsToCreateAssociationMixin, Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'
import {BankModel} from './BankModel'
import { RowsBankLctoInstance, RowsBankLctoModel } from './RowsBankLctoModel'

export interface BankLctoInstance extends Model {
    id: number,
    date_lcto: Date
    user: string
    totCredito: number,
    totDebito: number
    setRowsBankLctoModels: BelongsToCreateAssociationMixin<RowsBankLctoInstance>
}

export const BankLctoModel = sequelize.define<BankLctoInstance>("BankLctoModel",{
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.NUMBER
    },

    date_lcto: {
        type: DataTypes.DATE
    },
    user: {
        type: DataTypes.STRING
    },

    totCredito: {
        type: DataTypes.NUMBER
    },

    totDebito: {
        type: DataTypes.NUMBER
    },
    
    code_bank: {
        type: DataTypes.STRING
    },

    name_bank: {
        type: DataTypes.STRING
    },

    agency: {
        type: DataTypes.STRING
    },

    account: {
        type: DataTypes.STRING
    }

},
{
    tableName: 'bank_lcto',
    timestamps: false
})

BankLctoModel.belongsTo(BankModel,{
    foreignKey: 'id_bank',
    constraints: true
})

BankModel.hasOne(BankLctoModel, {
    foreignKey: 'id_bank'
})

RowsBankLctoModel.belongsTo(BankLctoModel,{
    foreignKey: 'id_lctoBank'
})
BankLctoModel.hasMany(RowsBankLctoModel,{
    foreignKey: 'id_lctoBank'
})
