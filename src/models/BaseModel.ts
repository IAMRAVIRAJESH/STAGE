import { BaseAttributes } from '../interfaces/BaseAttributes';
import { Model, DataTypes } from 'sequelize';

type CommonCreationAttributes = BaseAttributes;

export abstract class BaseModel<
  TModelAttributes extends BaseAttributes,
  TCreationAttributes extends CommonCreationAttributes = TModelAttributes,
> extends Model<TModelAttributes, TCreationAttributes> {
  static initializeCommonFields() {
    return {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      genres: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
    };
  }
}
