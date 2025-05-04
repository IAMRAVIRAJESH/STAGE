import { BaseAttributes } from './BaseAttributes';

interface Episode {
  episode_number: number;
  season_number: number;
  release_date: Date;
  director: string;
  actors: string[];
}

interface TVShowAttributes extends BaseAttributes {
  episodes: Episode[];
}

export { TVShowAttributes };
