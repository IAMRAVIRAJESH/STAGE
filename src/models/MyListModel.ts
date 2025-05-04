import { ContentType } from '../constants/Constants';
import { MyListAttributes } from '../interfaces/MyListAttributes';
import { Model, DataTypes, Sequelize } from 'sequelize';

export type MyListCreationAttributes = MyListAttributes;

class MyListModel extends Model<MyListAttributes, MyListCreationAttributes> {
  static initialize(sequelize: Sequelize) {
    const myList = this.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        content_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        content_type: {
          type: DataTypes.ENUM(...Object.values(ContentType)),
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'MyList',
        tableName: 'my_list',
        timestamps: false,
        indexes: [
          {
            unique: true,
            fields: ['user_id', 'content_id', 'content_type'],
          },
          {
            fields: ['user_id'],
          },
        ],
      }
    );

    return myList;
  }

  static associate(models: any) {
    this.belongsTo(models.UserModel, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

export default MyListModel;
