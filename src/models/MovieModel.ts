import { MovieAttributes } from '../interfaces/MovieAttributes';
import { DataTypes, Sequelize } from 'sequelize';
import { BaseModel } from './BaseModel';

export type MovieCreationAttributes = MovieAttributes;

class MovieModel extends BaseModel<MovieAttributes, MovieCreationAttributes> {
  static initialize(sequelize: Sequelize) {
    const movie = this.init(
      {
        ...BaseModel.initializeCommonFields(),
        release_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        director: {
          type: DataTypes.STRING(256),
          allowNull: false,
        },
        actors: {
          type: DataTypes.JSONB,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Movie',
        tableName: 'movies',
        timestamps: false,
      }
    );

    return movie;
  }
}

export default MovieModel;
