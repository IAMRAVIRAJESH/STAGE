import { Genre } from '../constants/Constants';

interface BaseAttributes {
  id: string;
  title: string;
  description: string;
  genres: Genre[];
}

export { BaseAttributes };
