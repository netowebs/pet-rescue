import { DataTypes, Model } from "sequelize/types";
import { sequelize } from "../instances/mysql";
import { CityModel } from "./CityModel";

export interface DistrictInstance extends Model{
    id: number,
    name: string,
    cep: string,
}

export const DistrictModel = sequelize.define('DistrictModel',{
    id:{
        primaryKey: true,
        type: DataTypes.NUMBER
    },
    name:{
        type: DataTypes.STRING
    },
    cep:{
        type: DataTypes.STRING
    }
},{
    tableName: 'districts',
    timestamps: false
})

DistrictModel.belongsTo(CityModel,{
    constraints: true,
    foreignKey: 'cities_id'
})