import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'

export interface RowsBankLctoInstance extends Model {
    id: number,
    type: string
    value: number
}

export const RowsBankLctoModel = sequelize.define<RowsBankLctoInstance>("RowsBankLctoModel",{
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },

    date_cad: {
        type: DataTypes.DATE
    },

    ttype: {
        type: DataTypes.STRING
    },
    vvalue: {
        type: DataTypes.NUMBER
    },
    description: {
        type: DataTypes.STRING
    },
    id_bank: {
        type: DataTypes.NUMBER
    }
},
{
    tableName: 'rows_lcto_bank',
    timestamps: false
})