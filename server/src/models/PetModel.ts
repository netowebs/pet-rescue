import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'
import { ApartmentModel } from './ApartmentModel'

export interface PetInstance extends Model {
    id: number,
    name: string,
    species: string,
    date_rescue: Date,
    status: string,
    sex: string,
    age_approx: number,
    temperament: string,
    size: string,
    note: string,
    qtd_food: number,
    color: string,
    coat_size: string
}

export const AnimalModel = sequelize.define<PetInstance>("AnimalModel", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    date_cad: {
        type: DataTypes.DATE
    },
    name:{
        type: DataTypes.STRING
    },
    species:{
        type: DataTypes.STRING
    },
    date_rescue:{
        type: DataTypes.DATE
    },
    status:{
        type: DataTypes.STRING
    },
    sex:{
        type: DataTypes.STRING
    },
    age_approx:{
        type: DataTypes.INTEGER
    },
    temperament:{
        type: DataTypes.STRING
    },
    size:{
        type: DataTypes.STRING
    },
    note: {
        type: DataTypes.STRING
    },
    qtd_food:{
        type: DataTypes.NUMBER
    },
    color:{
        type: DataTypes.STRING
    },
    coat_size:{
        type: DataTypes.STRING
    }
},{
    tableName: 'animals',
    timestamps: false
}
)

AnimalModel.belongsTo(ApartmentModel,{
    constraints: true,
    foreignKey: 'apartment_id'
})