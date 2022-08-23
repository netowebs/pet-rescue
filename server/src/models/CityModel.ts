import { DataTypes, Model } from "sequelize/types";
import { sequelize } from "../instances/mysql";
import {StateModel} from './StateModel'

export interface CityInstance extends Model{
    id: number,
    name: string
}

export const CityModel = sequelize.define<CityInstance>("CityModel",{
    id:{
        primaryKey: true,
        type: DataTypes.NUMBER
    },
    name:{
        type: DataTypes.STRING
    }
},{
    tableName: 'cities',
    timestamps: false
})

CityModel.belongsTo(StateModel,{
    constraints: true,
    foreignKey: 'states_id'
})