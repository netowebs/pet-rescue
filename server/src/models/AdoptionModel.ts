import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../instances/mysql'
import { AnimalModel } from './PetModel'
import { TutorModel } from './TutorModel'

export interface AdoptionInstance extends Model {
    id: number,
    user: string,
    date: Date,
    obs: string
}

export const AdoptionModel = sequelize.define<AdoptionInstance>("AdoptionModel", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    user: {
        type: DataTypes.STRING
    },

    date: {
        type: DataTypes.DATE
    },

    obs: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'adoptions',
    timestamps: false
}
)

AdoptionModel.belongsTo(AnimalModel,{
    foreignKey: 'id_animal',
    constraints: true
})

AdoptionModel.belongsTo(TutorModel,{
    foreignKey: 'id_tutor',
    constraints: true
})
