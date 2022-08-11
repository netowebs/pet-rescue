import moment from 'moment'
import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'

export interface PetInstance extends Model {
    id: number,
    adoptions_id: number,
    name: string,
    species: string,
    date_rescue: Date,
    status: string,
    sex: string,
    age_approx: number
}

export const PetModel = sequelize.define<PetInstance>("PetModel", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    adoptions_id:{
        type: DataTypes.INTEGER
    },
    name:{
        type: DataTypes.STRING
    },
    species:{
        type: DataTypes.STRING
    },
    date_rescue:{
        type: DataTypes.STRING,
    },
    status:{
        type: DataTypes.STRING
    },
    sex:{
        type: DataTypes.STRING
    },
    age_approx:{
        type: DataTypes.INTEGER
    }
},{
    tableName: 'animals',
    timestamps: false
}
)