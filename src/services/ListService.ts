import { Redis } from 'ioredis';
import { MyListModel, MovieModel, TVShowModel, UserModel } from '../models/';
import { MyListCreationAttributes } from '../models/MyListModel';
import AppError from '../Error/AppError';

class ListService {

  async findList(query: Record<string, any>): Promise<UserModel | null> {
    const userId = query.user_id;
    let redisClient: Redis;

if (process.env.REDIS_URL) {
  redisClient = new Redis(process.env.REDIS_URL);
} else {
  console.warn('REDIS_URL environment variable not set. Redis functionality will be disabled.');
  // You might want to handle this differently, perhaps by creating a dummy client
  // or throwing an error depending on your application's requirements.
  redisClient = undefined as any; // Or a no-op client
}
    const cacheKey = `user:${userId}:favorites`;
  
    try {
      // 1. Try to get the data from Redis cache
      const cachedData = await redisClient.get(cacheKey);
  
      if (cachedData) {
        console.log(`Cache hit for user ID: ${userId}`);
        return JSON.parse(cachedData) as UserModel;
      }
  
      // 2. If no data in cache, fetch from the database
      const user = await UserModel.findOne({ where: { id: userId } });
  
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
  
      // 3. Store the fetched data in Redis cache for future requests
      if (myList) {
        // Consider setting an expiry time for the cache (e.g., 1 hour = 3600 seconds)
        await redisClient.set(cacheKey, JSON.stringify(myList), 'EX', 3600);
        console.log(`Data for user ID: ${userId} stored in cache.`);
      }
  
      return myList;
    } catch (error) {
      console.error('Error fetching or caching user list:', error);
      // Consider how you want to handle errors - perhaps still return the DB result if Redis fails temporarily
      // Or re-throw the error depending on your application's needs.
      throw error;
    }
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
