import { MyListModel, MovieModel, TVShowModel, UserModel } from '../models/';
import { MyListCreationAttributes } from '../models/MyListModel';
import AppError from '../Error/AppError';

class ListService {
  async findList(query: Record<string, any>): Promise<UserModel | null> {
    const userId = query.user_id;

    const user = await UserModel.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError(404, `User not found in the user's list.`);
    }

    const myList = await UserModel.findByPk(userId, {
      include: [
        {
          model: MovieModel,
          as: 'favoriteMovies',
          through: { attributes: [] },
        },
        {
          model: TVShowModel,
          as: 'favoriteTVShows',
          through: { attributes: [] },
        },
      ],
    });

    return myList;
  }

  async addToList(listData: MyListCreationAttributes): Promise<MyListModel> {
    if (listData.content_type === 'movie') {
      const movieExists = await MovieModel.findByPk(listData.content_id);
      if (!movieExists) {
        throw new AppError(404, 'Movie not found.');
      }
    } else if (listData.content_type === 'tvshow') {
      const tvShowExists = await TVShowModel.findByPk(listData.content_id);
      if (!tvShowExists) {
        throw new AppError(404, 'TV Show not found.');
      }
    }
    const newItem = await MyListModel.create(listData);

    return newItem;
  }

  async deleteFromList(id: string): Promise<boolean> {
    const item = await MyListModel.findOne({
      where: { id },
    });

    if (!item) {
      throw new AppError(404, `Item not found in the user's list.`);
    }

    await item.destroy();

    return true;
  }
}

export { ListService };
