import { DataTypes, Model } from "sequelize/types";
import { sequelize } from "../instances/mysql";

export interface StateInstance extends Model{
    id: number,
    name: string
}

export const StateModel = sequelize.define<StateInstance>("StateModel",{
    id: {
        primaryKey: true,
        type: DataTypes.NUMBER
    },
    name: {
        type: DataTypes.STRING
    }
},{
    tableName: 'states',
    timestamps: false
})