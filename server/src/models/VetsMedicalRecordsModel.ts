import {Model} from 'sequelize'
import {sequelize} from '../instances/mysql'

export interface VetsMedicalRecordsInstance extends Model {

}

export const VetsMedicalRecordsModel = sequelize.define<VetsMedicalRecordsInstance>("vetsMedicalRecordsModel",{

},
{
    tableName: 'vets_ficha_medica',
    timestamps: false
})