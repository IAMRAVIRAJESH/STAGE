import { Genre } from '../constants/Constants';

interface WatchHistoryEntry {
  content_id: string;
  watched_on: Date;
  rating?: number;
}

interface UserAttributes {
  id: string;
  username: string;
  preferences: {
    favorite_genres: Genre[];
    disliked_genres: Genre[];
  };
  watch_history: WatchHistoryEntry[];
}

export { UserAttributes };
