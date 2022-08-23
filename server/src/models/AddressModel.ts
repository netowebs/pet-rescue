import { DataTypes, Model } from "sequelize/types";
import { sequelize } from "../instances/mysql";
import { DistrictModel } from "./DistrictModel";

export interface AddressInstance extends Model{
    id: number,
    name: string,
    number: number,
    complement: string,
}

export const AddressModel = sequelize.define('AddressModel',{
    id:{
        primaryKey: true,
        type: DataTypes.NUMBER
    },
    name:{
        type: DataTypes.STRING
    },
    number:{
        type: DataTypes.NUMBER
    },
    complement:{
        type: DataTypes.STRING
    }
},{
    tableName: 'address',
    timestamps: false
})

AddressModel.belongsTo(DistrictModel,{
    constraints: true,
    foreignKey: 'districts_id'
})
