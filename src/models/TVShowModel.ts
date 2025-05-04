import { TVShowAttributes } from '../interfaces/TVShowAttributes';
import { DataTypes, Sequelize } from 'sequelize';
import { BaseModel } from './BaseModel';

export type TVShowCreationAttributes = TVShowAttributes;

class TVShowModel extends BaseModel<TVShowAttributes, TVShowCreationAttributes> {
  static initialize(sequelize: Sequelize) {
    const tvShow = this.init(
      {
        ...BaseModel.initializeCommonFields(),
        episodes: {
          type: DataTypes.JSONB,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'TVShows',
        tableName: 'tv_shows',
        timestamps: false,
      }
    );

    return tvShow;
  }
}

export default TVShowModel;
