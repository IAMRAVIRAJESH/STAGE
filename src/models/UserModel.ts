import { UserAttributes } from '../interfaces/UserAttributes';
import { Model, DataTypes, Sequelize } from 'sequelize';

export type UserCreationAttributes = UserAttributes;

class UserModel extends Model<UserAttributes, UserCreationAttributes> {
  static initialize(sequelize: Sequelize) {
    const user = this.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        preferences: {
          type: DataTypes.JSONB,
          allowNull: false,
          defaultValue: { favorite_genres: [], disliked_genres: [] },
        },
        watch_history: {
          type: DataTypes.JSONB,
          allowNull: false,
          defaultValue: [],
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
      }
    );

    return user;
  }

  static associate(models: any) {
    this.hasMany(models.MyListModel, {
      foreignKey: 'user_id',
      as: 'myList',
    });

    this.belongsToMany(models.MovieModel, {
      through: {
        model: models.MyListModel,
      },
      foreignKey: 'user_id',
      otherKey: 'content_id',
      as: 'favoriteMovies',
    });

    this.belongsToMany(models.TVShowModel, {
      through: {
        model: models.MyListModel,
      },
      foreignKey: 'user_id',
      otherKey: 'content_id',
      as: 'favoriteTVShows',
    });
  }
}

export default UserModel;
